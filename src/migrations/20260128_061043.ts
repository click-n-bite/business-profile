import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres"

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
   ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#FCE7F3';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#DBEAFE';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#D1FAE5';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#E9D5FF';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#FFEDD5';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#E0F2FE';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#F3F4F6';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#FEF3C7';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#FECDD3';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#CCFBF1';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#1E40AF';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#4B5563';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#065F46';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#EA580C';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#7C3AED';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#0D9488';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#B45309';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#1F2937';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#2563EB';
  ALTER TYPE "public"."enum_business_themes_primary_color" ADD VALUE '#15803D';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#FCE7F3';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#DBEAFE';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#D1FAE5';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#E9D5FF';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#FFEDD5';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#E0F2FE';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#F3F4F6';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#FEF3C7';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#FECDD3';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#CCFBF1';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#1E40AF';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#4B5563';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#065F46';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#EA580C';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#7C3AED';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#0D9488';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#B45309';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#1F2937';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#2563EB';
  ALTER TYPE "public"."enum_business_themes_secondary_color" ADD VALUE '#15803D';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#FCE7F3';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#DBEAFE';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#D1FAE5';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#E9D5FF';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#FFEDD5';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#E0F2FE';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#F3F4F6';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#FEF3C7';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#FECDD3';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#CCFBF1';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#1E40AF';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#4B5563';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#065F46';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#EA580C';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#7C3AED';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#0D9488';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#B45309';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#1F2937';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#2563EB';
  ALTER TYPE "public"."enum_business_themes_accent_color" ADD VALUE '#15803D';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
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
