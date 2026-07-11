ALTER TABLE "leads" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "status" SET DEFAULT 'NEW'::text;--> statement-breakpoint
DROP TYPE "public"."lead_status";--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('NEW', 'IN_REVIEW', 'ACCEPTED', 'REJECTED', 'IGNORED');--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "status" SET DEFAULT 'NEW'::"public"."lead_status";--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "status" SET DATA TYPE "public"."lead_status" USING "status"::"public"."lead_status";