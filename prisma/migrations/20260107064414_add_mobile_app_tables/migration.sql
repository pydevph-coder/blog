-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "installed_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(3),
    "device_model" TEXT,
    "android_version" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reports" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "solved" BOOLEAN NOT NULL DEFAULT false,
    "date_solved" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."version_control" (
    "id" TEXT NOT NULL,
    "app" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "build_date" TIMESTAMP(3) NOT NULL,
    "update_message" TEXT,
    "notification" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "version_control_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_device_id_key" ON "public"."users"("device_id");

-- CreateIndex
CREATE INDEX "reports_user_id_idx" ON "public"."reports"("user_id");

-- CreateIndex
CREATE INDEX "reports_solved_idx" ON "public"."reports"("solved");

-- CreateIndex
CREATE INDEX "reports_date_idx" ON "public"."reports"("date");

-- CreateIndex
CREATE UNIQUE INDEX "version_control_app_version_key" ON "public"."version_control"("app", "version");

-- CreateIndex
CREATE INDEX "version_control_app_idx" ON "public"."version_control"("app");

-- CreateIndex
CREATE INDEX "version_control_build_date_idx" ON "public"."version_control"("build_date");

-- AddForeignKey
ALTER TABLE "public"."reports" ADD CONSTRAINT "reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;






