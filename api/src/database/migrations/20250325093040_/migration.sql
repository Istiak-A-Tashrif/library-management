-- CreateEnum
CREATE TYPE "LOGIN_TYPE" AS ENUM ('EMAIL', 'GOOGLE', 'FACEBOOK');

-- CreateTable
CREATE TABLE "admin_users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "push_token" TEXT,
    "profile_photo" VARCHAR(200),
    "timezone" VARCHAR(20),

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_password_resets" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "reset_code" VARCHAR(200) NOT NULL,
    "reset_token" VARCHAR(200),

    CONSTRAINT "admin_password_resets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp_verifications" (
    "id" SERIAL NOT NULL,
    "otp" INTEGER NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "phone" VARCHAR(200),

    CONSTRAINT "otp_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reset_password" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "otp" VARCHAR(10) NOT NULL,
    "role" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "reset_password_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_templates" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_sms_enabled" BOOLEAN NOT NULL DEFAULT false,
    "is_email_enabled" BOOLEAN NOT NULL DEFAULT false,
    "is_push_enabled" BOOLEAN NOT NULL DEFAULT false,
    "email_subject" TEXT,
    "email_content" TEXT,
    "sms_content" TEXT,
    "push_title" TEXT,
    "push_content" TEXT,
    "slug" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" VARCHAR(200),
    "phone" VARCHAR(200),
    "password" TEXT,
    "profile_image" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "login_type" "LOGIN_TYPE" NOT NULL DEFAULT 'EMAIL',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sort_order" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_password_resets_email_key" ON "admin_password_resets"("email");

-- CreateIndex
CREATE UNIQUE INDEX "otp_verifications_email_key" ON "otp_verifications"("email");

-- CreateIndex
CREATE UNIQUE INDEX "settings_key_key" ON "settings"("key");

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_email_key" ON "reset_password"("email");

-- CreateIndex
CREATE UNIQUE INDEX "notification_templates_slug_key" ON "notification_templates"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
