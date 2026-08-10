# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Naming conventions

- Files: kebab-case
- Variables/exports: camelCase
- Database tables/columns: snake_case (map to camelCase in Drizzle column definitions, e.g. `bioguideId: varchar("bioguide_id", ...)`)

## Commands

TypeScript runs directly via `tsx` — there is no compile/build step and no `tsconfig.json`.

- `npm run test:db` — sanity-check the DB connection (`SELECT version()`)
- `npm run import:politician <bioguideId>` — end-to-end import of one Congress member (e.g. `npm run import:politician A000360`)
- `npm run import:bill` — import a single bill (the identifier `119 / hr / 1` is currently hardcoded in `src/scripts/importBill.ts`, not passed as args)
- `npm run db:generate` — generate a migration from schema changes
- `npm run db:migrate` — apply pending migrations
- `npm run db:push` — push schema directly to the DB without a migration file
- `npm run db:studio` — open Drizzle Studio

`npm test` is an unconfigured placeholder — there is no test runner in this project yet.

Requires a `.env` with `DATABASE_URL` (Postgres) and `API_GOV_DATA` (congress.gov API key).

## Architecture

This is the backend for a political "report card" app. The Express server (`server.ts`, `src/app.ts`) is currently an empty stub — **the only working functionality today is a script-driven data-import pipeline** that pulls from congress.gov into Postgres.

Data flows through distinct layers, one direction only:

```
script (parse args) → service (transaction boundary) → repository → Drizzle schema → Postgres
                          │  ├─ resource client → congressClient.get<T> → congress.gov API
                          │  └─ mapper (pure: API shape → DB insert shape)
```

- **`src/scripts/`** — CLI entrypoints run via `tsx`. Thin: parse args, call one service, log the result. See `importPolitician.ts` / `importBill.ts`.
- **`src/services/`** — own the **whole import flow**: fetch via a client, map, then run repository calls inside a single `db.transaction(...)`. They take a plain identifier (`importPolitician(bioguideId)`, `importBill(congress, billType, billNumber)`) — **not** pre-mapped data. This is where upsert/idempotency logic lives.
- **`src/clients/`** — two tiers. `congressClient.ts` is a low-level generic HTTP wrapper: `congressClient.get<T>(endpoint)` (adds base URL + API key, throws on non-2xx). Per-resource clients (`memberClient.ts`, `billClient.ts`) wrap it, own the endpoint path, and type the response.
- **`src/mappers/`** — pure functions converting external API shapes → DB insert shapes. No I/O.
- **`src/repositories/`** — the only place that touches Drizzle tables. Grouped by function object (e.g. `billRepository = { create, update, getById, getByIdentifier }`).
- **`src/db/schema/`** — Drizzle table definitions and relations.

### Two conventions that matter

1. **Every repository function takes a `Database` as its first argument** (`src/db/types.ts`: `type Database = typeof db | PgTransaction<...>`). Callers pass either the shared `db` or a transaction handle `tx`. This is what lets a service run multiple repository calls inside one `db.transaction`. When adding a repository method, follow this signature.

2. **Idempotent imports.** Services check-then-upsert inside the transaction: politicians upsert by `bioguideId`; bills look up by the `(congress, bill_type, bill_number)` identifier tuple then `update` vs `create`; offices use `getOrCreate` keyed by (name/level/branch/chamber); link tables (`politician_offices`, `bill_sponsors`, `vote_records`) have unique constraints and are guarded by a `getByDefinition`-style check before insert. Re-running an import should not duplicate rows. When a mapper normalizes a value (e.g. `billMapper` lowercases `billType`), the lookup must use the **mapped** value so it matches what `create` would store.

### Types: two homes

- **`src/types/congress/`** (`member.ts`, `bill.ts`) — hand-written interfaces for the **external** congress.gov response shapes (`CongressMemberResponse`, `CongressBill`, etc.). This is what clients return and mappers consume.
- **`src/db/schema/Types.ts`** — **internal** insert/definition types not tied to one table (`PoliticianInsert`, `OfficeTerm`, `OfficeDefinition`).
- **Per-table insert types** are inferred with `InferInsertModel` and exported from the schema file itself (e.g. `BillInsert`, `OfficeInsert`, `PoliticianOfficeInsert`).

### Database

- Drizzle ORM over `pg` with a single shared `Pool` (`src/db/client.ts`) → `db` (`src/db/index.ts`).
- `drizzle.config.ts` globs `./src/db/schema/**/*.ts`; migrations are written to `./src/db/migrations`.
- **Active schema** (re-exported from `src/db/schema/index.ts`): the `politicians` domain (`politicians`, `offices`, `politician_offices`) and the `bills` domain (`bills`, `bill_sponsors`, `votes`, `vote_records`).
- Still stubs/future work, **not** wired into the exported schema or the app: `committees/`, `organizations/`, `users/`, `billEmbeddings.ts`, `syncJobs.ts`.
