DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('oficial', 'blue', 'mep', 'cocos', 'tarjeta', 'mayorista', 'ccl', 'cripto');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "historical-prices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "type" NOT NULL,
	"timestamp" timestamp NOT NULL,
	"ask" numeric,
	"bid" numeric
);
