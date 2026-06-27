CREATE TYPE "public"."lead_status" AS ENUM('NEW', 'IN_REVIEW', 'ACCEPTED', 'REJECTED', 'IGNORED', 'LOST', 'ARCHIVED');--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"converted_user_id" integer,
	"manager_id" integer,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"patronymic" text,
	"email" text NOT NULL,
	"phone" text,
	"telegram" text,
	"experience" text,
	"test_result" text,
	"status" "lead_status" DEFAULT 'NEW' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "submission" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "submission" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "lessons" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "lessons" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "streams" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "streams" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "manager_profile" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "manager_profile" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "mentor_profile" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "mentor_profile" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "student_profile" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "student_profile" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_converted_user_id_users_id_fk" FOREIGN KEY ("converted_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_manager_id_manager_profile_id_fk" FOREIGN KEY ("manager_id") REFERENCES "public"."manager_profile"("id") ON DELETE set null ON UPDATE no action;