ALTER TABLE "submission" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "submission" ALTER COLUMN "status" SET DEFAULT 'NEW'::text;--> statement-breakpoint
DROP TYPE "public"."submission_status";--> statement-breakpoint
CREATE TYPE "public"."submission_status" AS ENUM('NEW', 'REVIEWING', 'CHANGES_REQUESTED', 'ACCEPTED', 'RESUBMITTED');--> statement-breakpoint
ALTER TABLE "submission" ALTER COLUMN "status" SET DEFAULT 'NEW'::"public"."submission_status";--> statement-breakpoint
ALTER TABLE "submission" ALTER COLUMN "status" SET DATA TYPE "public"."submission_status" USING "status"::"public"."submission_status";