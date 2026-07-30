ALTER TABLE "politicians" ADD COLUMN "birth_year" integer;--> statement-breakpoint
ALTER TABLE "politicians" ADD COLUMN "current_member" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "politicians" ADD COLUMN "state" varchar(2);--> statement-breakpoint
ALTER TABLE "politicians" ADD COLUMN "image_url" varchar(255);--> statement-breakpoint
ALTER TABLE "politicians" DROP COLUMN "date_of_birth";