import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres"

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
   ALTER TABLE "business_themes" ALTER COLUMN "primary_color" SET DATA TYPE text;
  DROP TYPE "public"."enum_business_themes_primary_color";
  CREATE TYPE "public"."enum_business_themes_primary_color" AS ENUM('#3B82F6', '#136c36', '#c30811', '#FACC15', '#8B5CF6', '#EC4899', '#6B7280');
  ALTER TABLE "business_themes" ALTER COLUMN "primary_color" SET DATA TYPE "public"."enum_business_themes_primary_color" USING "primary_color"::"public"."enum_business_themes_primary_color";
  ALTER TABLE "business_themes" ALTER COLUMN "secondary_color" SET DATA TYPE text;
  DROP TYPE "public"."enum_business_themes_secondary_color";
  CREATE TYPE "public"."enum_business_themes_secondary_color" AS ENUM('#3B82F6', '#136c36', '#c30811', '#FACC15', '#8B5CF6', '#EC4899', '#6B7280');
  ALTER TABLE "business_themes" ALTER COLUMN "secondary_color" SET DATA TYPE "public"."enum_business_themes_secondary_color" USING "secondary_color"::"public"."enum_business_themes_secondary_color";
  ALTER TABLE "business_themes" ALTER COLUMN "accent_color" SET DATA TYPE text;
  DROP TYPE "public"."enum_business_themes_accent_color";
  CREATE TYPE "public"."enum_business_themes_accent_color" AS ENUM('#3B82F6', '#136c36', '#c30811', '#FACC15', '#8B5CF6', '#EC4899', '#6B7280');
  ALTER TABLE "business_themes" ALTER COLUMN "accent_color" SET DATA TYPE "public"."enum_business_themes_accent_color" USING "accent_color"::"public"."enum_business_themes_accent_color";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
   ALTER TABLE "business_themes" ALTER COLUMN "primary_color" SET DATA TYPE text;
  DROP TYPE "public"."enum_business_themes_primary_color";
  CREATE TYPE "public"."enum_business_themes_primary_color" AS ENUM('#3B82F6', '#22C55E', '#EF4444');
  ALTER TABLE "business_themes" ALTER COLUMN "primary_color" SET DATA TYPE "public"."enum_business_themes_primary_color" USING "primary_color"::"public"."enum_business_themes_primary_color";
  ALTER TABLE "business_themes" ALTER COLUMN "secondary_color" SET DATA TYPE text;
  DROP TYPE "public"."enum_business_themes_secondary_color";
  CREATE TYPE "public"."enum_business_themes_secondary_color" AS ENUM('#3B82F6', '#22C55E', '#EF4444');
  ALTER TABLE "business_themes" ALTER COLUMN "secondary_color" SET DATA TYPE "public"."enum_business_themes_secondary_color" USING "secondary_color"::"public"."enum_business_themes_secondary_color";
  ALTER TABLE "business_themes" ALTER COLUMN "accent_color" SET DATA TYPE text;
  DROP TYPE "public"."enum_business_themes_accent_color";
  CREATE TYPE "public"."enum_business_themes_accent_color" AS ENUM('#3B82F6', '#22C55E', '#EF4444');
  ALTER TABLE "business_themes" ALTER COLUMN "accent_color" SET DATA TYPE "public"."enum_business_themes_accent_color" USING "accent_color"::"public"."enum_business_themes_accent_color";`)
}
