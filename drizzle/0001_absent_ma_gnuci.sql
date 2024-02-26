ALTER TABLE "historical-prices" ALTER COLUMN "timestamp" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "historical-prices" ALTER COLUMN "timestamp" SET DEFAULT now();