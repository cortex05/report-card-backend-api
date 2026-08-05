CREATE TYPE "public"."vote_value" AS ENUM ('yea', 'nay', 'present', 'not_voting');
--> statement-breakpoint
CREATE TABLE "bill_sponsors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bill_id" uuid NOT NULL,
	"politician_id" uuid NOT NULL,
	"role" varchar(50) NOT NULL,
	"source" varchar(100),
	"date_added" date,
	CONSTRAINT "bill_sponsor_unique" UNIQUE("bill_id","politician_id","role")
);
--> statement-breakpoint
CREATE TABLE "bills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"congress" integer NOT NULL,
	"bill_type" varchar(20) NOT NULL,
	"bill_number" integer NOT NULL,
	"title" text NOT NULL,
	"introduced_date" date,
	"status" varchar(100),
	"origin_chamber" varchar(50),
	"summary" text,
	"policy_area" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_synced_at" timestamp DEFAULT now(),
	CONSTRAINT "bill_unique" UNIQUE("congress","bill_type","bill_number")
);
--> statement-breakpoint
CREATE TABLE "vote_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vote_id" uuid NOT NULL,
	"politician_id" uuid NOT NULL,
	"vote" "vote_value" NOT NULL,
	CONSTRAINT "vote_record_unique" UNIQUE("vote_id","politician_id")
);
--> statement-breakpoint
CREATE TABLE "votes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bill_id" uuid NOT NULL,
	"congress" integer NOT NULL,
	"chamber" varchar(50) NOT NULL,
	"vote_date" date,
	"question" text,
	"result" varchar(50),
	"source_id" varchar(100),
	CONSTRAINT "vote_unique" UNIQUE("congress","chamber","source_id")
);
--> statement-breakpoint
ALTER TABLE "bill_sponsors" ADD CONSTRAINT "bill_sponsors_bill_id_bills_id_fk" FOREIGN KEY ("bill_id") REFERENCES "public"."bills"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bill_sponsors" ADD CONSTRAINT "bill_sponsors_politician_id_politicians_id_fk" FOREIGN KEY ("politician_id") REFERENCES "public"."politicians"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vote_records" ADD CONSTRAINT "vote_records_vote_id_votes_id_fk" FOREIGN KEY ("vote_id") REFERENCES "public"."votes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vote_records" ADD CONSTRAINT "vote_records_politician_id_politicians_id_fk" FOREIGN KEY ("politician_id") REFERENCES "public"."politicians"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_bill_id_bills_id_fk" FOREIGN KEY ("bill_id") REFERENCES "public"."bills"("id") ON DELETE no action ON UPDATE no action;