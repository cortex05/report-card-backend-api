CREATE TABLE "politicians" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bioguide_id" varchar(20),
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"date_of_birth" date,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "politicians_bioguide_id_unique" UNIQUE("bioguide_id")
);
--> statement-breakpoint
CREATE TABLE "offices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"level" varchar(50) NOT NULL,
	"branch" varchar(50),
	"chamber" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "politician_offices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"politician_id" uuid NOT NULL,
	"office_id" uuid NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"party" varchar(100),
	"source" varchar(100),
	"source_id" varchar(100),
	CONSTRAINT "politician_office_unique" UNIQUE("politician_id","office_id","start_date")
);
--> statement-breakpoint
ALTER TABLE "politician_offices" ADD CONSTRAINT "politician_offices_politician_id_politicians_id_fk" FOREIGN KEY ("politician_id") REFERENCES "public"."politicians"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "politician_offices" ADD CONSTRAINT "politician_offices_office_id_offices_id_fk" FOREIGN KEY ("office_id") REFERENCES "public"."offices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "politicians_last_name_idx" ON "politicians" USING btree ("last_name");