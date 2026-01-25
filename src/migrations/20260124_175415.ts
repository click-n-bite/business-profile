import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_business_themes_dark_background_type" AS ENUM('color', 'image');
  CREATE TYPE "public"."enum_business_themes_dark_background_color" AS ENUM('#000000', '#111827');
  ALTER TABLE "business_themes" ADD COLUMN "dark_background_type" "enum_business_themes_dark_background_type" DEFAULT 'color' NOT NULL;
  ALTER TABLE "business_themes" ADD COLUMN "dark_background_color" "enum_business_themes_dark_background_color";
  ALTER TABLE "business_themes" ADD COLUMN "dark_background_image_id" uuid;
  ALTER TABLE "business_themes" ADD CONSTRAINT "business_themes_dark_background_image_id_media_id_fk" FOREIGN KEY ("dark_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "business_themes_dark_background_dark_background_image_idx" ON "business_themes" USING btree ("dark_background_image_id");
  ALTER TABLE "business_themes" DROP COLUMN "dark_background";
  DROP TYPE "public"."enum_business_themes_dark_background";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_business_themes_dark_background" AS ENUM('#000000', '#111827');
  ALTER TABLE "business_themes" DROP CONSTRAINT "business_themes_dark_background_image_id_media_id_fk";
  
  DROP INDEX "business_themes_dark_background_dark_background_image_idx";
  ALTER TABLE "business_themes" ADD COLUMN "dark_background" "enum_business_themes_dark_background" DEFAULT '#111827';
  ALTER TABLE "business_themes" DROP COLUMN "dark_background_type";
  ALTER TABLE "business_themes" DROP COLUMN "dark_background_color";
  ALTER TABLE "business_themes" DROP COLUMN "dark_background_image_id";
  DROP TYPE "public"."enum_business_themes_dark_background_type";
  DROP TYPE "public"."enum_business_themes_dark_background_color";`)
}
