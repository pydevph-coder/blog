-- Add reinstall tracking fields to users table

-- Add first_install_date (original installation date)
ALTER TABLE "public"."users" ADD COLUMN "first_install_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Add last_reinstall_date (nullable, tracks when last reinstall happened)
ALTER TABLE "public"."users" ADD COLUMN "last_reinstall_date" TIMESTAMP(3);

-- Add reinstall_count (number of reinstalls)
ALTER TABLE "public"."users" ADD COLUMN "reinstall_count" INTEGER NOT NULL DEFAULT 0;

-- Update existing users: set first_install_date to installed_date
UPDATE "public"."users" SET "first_install_date" = "installed_date" WHERE "first_install_date" IS NULL;

