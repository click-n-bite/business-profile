import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_business_themes_theme_type" AS ENUM('business', 'personal');
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'portfolio';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'pinterest';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'github';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'whatsapp';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'threads';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'snapchat';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'discord';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'reddit';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'twitch';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'spotify';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'behance';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'dribbble';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'figma';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'newsletter';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'email';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'phone';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'linktree';
  ALTER TYPE "public"."enum_social_links_platform" ADD VALUE 'calendly';
  ALTER TABLE "business_themes" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "social_links" ALTER COLUMN "platform" SET DEFAULT 'website';
  ALTER TABLE "social_links" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "social_links" ALTER COLUMN "order" SET DEFAULT 0;
  ALTER TABLE "business_themes" ADD COLUMN "theme_type" "enum_business_themes_theme_type" DEFAULT 'business' NOT NULL;
  ALTER TABLE "about_business" DROP COLUMN "title";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "social_links" ALTER COLUMN "platform" SET DATA TYPE text;
  DROP TYPE "public"."enum_social_links_platform";
  CREATE TYPE "public"."enum_social_links_platform" AS ENUM('website', 'instagram', 'tiktok', 'telegram', 'facebook', 'linkedin', 'youtube', 'twitter');
  ALTER TABLE "social_links" ALTER COLUMN "platform" SET DATA TYPE "public"."enum_social_links_platform" USING "platform"::"public"."enum_social_links_platform";
  ALTER TABLE "business_themes" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "social_links" ALTER COLUMN "platform" DROP DEFAULT;
  ALTER TABLE "social_links" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "social_links" ALTER COLUMN "order" DROP DEFAULT;
  ALTER TABLE "about_business" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "business_themes" DROP COLUMN "theme_type";
  DROP TYPE "public"."enum_business_themes_theme_type";`)
}
