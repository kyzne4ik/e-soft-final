CREATE TABLE "stream_telegram" (
	"id" serial PRIMARY KEY NOT NULL,
	"stream_id" integer NOT NULL,
	"chat_id" text,
	"announce_thread_id" integer,
	"linked_at" timestamp with time zone,
	CONSTRAINT "stream_telegram_stream_id_unique" UNIQUE("stream_id")
);
--> statement-breakpoint
ALTER TABLE "lessons" ADD COLUMN "announce_sent_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "lessons" ADD COLUMN "reminder_sent_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "stream_telegram" ADD CONSTRAINT "stream_telegram_stream_id_streams_id_fk" FOREIGN KEY ("stream_id") REFERENCES "public"."streams"("id") ON DELETE cascade ON UPDATE no action;