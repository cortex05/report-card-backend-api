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
script (entrypoint) → client (external API) → mapper → service (transaction) → repository → Drizzle schema → Postgres
```

- **`src/scripts/`** — CLI entrypoints run via `tsx`. They read args, call a client, map, then a service. See `importPolitician.ts`.
- **`src/clients/`** — thin wrappers over external HTTP APIs. `congressClient.ts` talks to `https://api.congress.gov/v3`.
- **`src/mappers/`** — pure functions converting external API shapes → DB insert shapes. No I/O.
- **`src/services/`** — orchestration and business logic; own the DB transaction boundary via `db.transaction(...)`. `politicianImportService.ts` upserts a politician and, for each term, get-or-creates an office and links the two.
- **`src/repositories/`** — the only place that touches Drizzle tables. Grouped by function object (e.g. `politicianRepository = { create, getByBioguideId, update }`).
- **`src/db/schema/`** — Drizzle table definitions and relations.

### Two conventions that matter

1. **Every repository function takes a `Database` as its first argument** (`src/db/types.ts`: `type Database = typeof db | PgTransaction<...>`). Callers pass either the shared `db` or a transaction handle `tx`. This is what lets a service run multiple repository calls inside one `db.transaction`. When adding a repository method, follow this signature.

2. **Idempotent imports.** Politicians are upserted by `bioguideId`; offices use a `getOrCreate` keyed by a uniqueness tuple (name/level/branch/chamber); the `politician_offices` link table has a unique constraint on (politician, office, start_date). Re-running an import should not duplicate rows.

### Database

- Drizzle ORM over `pg` with a single shared `Pool` (`src/db/client.ts`) → `db` (`src/db/index.ts`).
- `drizzle.config.ts` globs `./src/db/schema/**/*.ts`; migrations are written to `./src/db/migrations`.
- **`src/db/schema/index.ts` only re-exports the `politicians`, `offices`, and `politician_offices` tables** — those are the active schema. Other files under `src/db/schema/` (`bills/`, `committees/`, `organizations/`, `users/`, `billEmbeddings.ts`, `syncJobs.ts`) are stubs/future work and are not wired into the exported schema or the app.

### Shared types

`src/db/schema/Types.ts` holds the hand-written interfaces for the congress.gov API response shape (`CongressMemberResponse`, `TermRecord`, etc.) and the internal insert/definition types. DB-row insert types are instead inferred per-table with `InferInsertModel` and exported from the schema file (e.g. `OfficeInsert`, `PoliticianOfficeInsert`).
