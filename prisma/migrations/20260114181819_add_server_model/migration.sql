-- CreateTable
CREATE TABLE "public"."servers" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "servers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "servers_url_key" ON "public"."servers"("url");

-- CreateIndex
CREATE INDEX "servers_url_idx" ON "public"."servers"("url");

