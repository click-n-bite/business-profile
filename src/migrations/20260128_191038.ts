import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "business_themes" ALTER COLUMN "light_background_color" SET DATA TYPE text;
  DROP TYPE "public"."enum_business_themes_light_background_color";
  CREATE TYPE "public"."enum_business_themes_light_background_color" AS ENUM('#3B82F6', '#136c36', '#c30811', '#FACC15', '#8B5CF6', '#EC4899', '#6B7280', '#FCE7F3', '#DBEAFE', '#D1FAE5', '#E9D5FF', '#FFEDD5', '#E0F2FE', '#F3F4F6', '#FEF3C7', '#FECDD3', '#CCFBF1', '#1E40AF', '#4B5563', '#065F46', '#EA580C', '#7C3AED', '#0D9488', '#B45309', '#1F2937', '#2563EB', '#15803D');
  ALTER TABLE "business_themes" ALTER COLUMN "light_background_color" SET DATA TYPE "public"."enum_business_themes_light_background_color" USING "light_background_color"::"public"."enum_business_themes_light_background_color";
  ALTER TABLE "business_themes" ALTER COLUMN "dark_background_color" SET DATA TYPE text;
  DROP TYPE "public"."enum_business_themes_dark_background_color";
  CREATE TYPE "public"."enum_business_themes_dark_background_color" AS ENUM('#3B82F6', '#136c36', '#c30811', '#FACC15', '#8B5CF6', '#EC4899', '#6B7280', '#FCE7F3', '#DBEAFE', '#D1FAE5', '#E9D5FF', '#FFEDD5', '#E0F2FE', '#F3F4F6', '#FEF3C7', '#FECDD3', '#CCFBF1', '#1E40AF', '#4B5563', '#065F46', '#EA580C', '#7C3AED', '#0D9488', '#B45309', '#1F2937', '#2563EB', '#15803D');
  ALTER TABLE "business_themes" ALTER COLUMN "dark_background_color" SET DATA TYPE "public"."enum_business_themes_dark_background_color" USING "dark_background_color"::"public"."enum_business_themes_dark_background_color";
  ALTER TABLE "business_themes" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "business_themes" ALTER COLUMN "light_background_type" SET NOT NULL;
  ALTER TABLE "contact_departments" ADD COLUMN "sms" boolean DEFAULT false;
  ALTER TABLE "business_themes" DROP COLUMN "accent_color";
  DROP TYPE "public"."enum_business_themes_accent_color";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_business_themes_accent_color" AS ENUM('#3B82F6', '#136c36', '#c30811', '#FACC15', '#8B5CF6', '#EC4899', '#6B7280', '#FCE7F3', '#DBEAFE', '#D1FAE5', '#E9D5FF', '#FFEDD5', '#E0F2FE', '#F3F4F6', '#FEF3C7', '#FECDD3', '#CCFBF1', '#1E40AF', '#4B5563', '#065F46', '#EA580C', '#7C3AED', '#0D9488', '#B45309', '#1F2937', '#2563EB', '#15803D');
  ALTER TABLE "business_themes" ALTER COLUMN "light_background_color" SET DATA TYPE text;
  DROP TYPE "public"."enum_business_themes_light_background_color";
  CREATE TYPE "public"."enum_business_themes_light_background_color" AS ENUM('#FFFFFF', '#F9FAFB', '#F3F4F6');
  ALTER TABLE "business_themes" ALTER COLUMN "light_background_color" SET DATA TYPE "public"."enum_business_themes_light_background_color" USING "light_background_color"::"public"."enum_business_themes_light_background_color";
  ALTER TABLE "business_themes" ALTER COLUMN "dark_background_color" SET DATA TYPE text;
  DROP TYPE "public"."enum_business_themes_dark_background_color";
  CREATE TYPE "public"."enum_business_themes_dark_background_color" AS ENUM('#000000', '#111827');
  ALTER TABLE "business_themes" ALTER COLUMN "dark_background_color" SET DATA TYPE "public"."enum_business_themes_dark_background_color" USING "dark_background_color"::"public"."enum_business_themes_dark_background_color";
  ALTER TABLE "business_themes" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "business_themes" ALTER COLUMN "light_background_type" DROP NOT NULL;
  ALTER TABLE "business_themes" ADD COLUMN "accent_color" "enum_business_themes_accent_color";
  ALTER TABLE "contact_departments" DROP COLUMN "sms";`)
}
