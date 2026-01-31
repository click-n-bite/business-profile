import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres"

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
   CREATE TYPE "public"."enum_business_themes_light_background_type" AS ENUM('color', 'image');
  CREATE TYPE "public"."enum_business_themes_light_background_color" AS ENUM('#FFFFFF', '#F9FAFB', '#F3F4F6');
  CREATE TYPE "public"."enum_business_themes_dark_background" AS ENUM('#000000', '#111827');
  CREATE TYPE "public"."enum_business_themes_primary_color" AS ENUM('#3B82F6', '#22C55E', '#EF4444');
  CREATE TYPE "public"."enum_business_themes_secondary_color" AS ENUM('#3B82F6', '#22C55E', '#EF4444');
  CREATE TYPE "public"."enum_business_themes_accent_color" AS ENUM('#3B82F6', '#22C55E', '#EF4444');
  CREATE TYPE "public"."enum_section_titles_section_type" AS ENUM('about', 'contact', 'social', 'partners', 'locations', 'gallery');
  CREATE TABLE "section_titles" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"section_type" "enum_section_titles_section_type" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "section_titles_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "about_section" RENAME TO "about_business";
  ALTER TABLE "business_themes" RENAME COLUMN "background_color" TO "name";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_about_section_fk";
  
  DROP INDEX "about_section_updated_at_idx";
  DROP INDEX "about_section_created_at_idx";
  DROP INDEX "payload_locked_documents_rels_about_section_id_idx";
  ALTER TABLE "business_themes" ALTER COLUMN "primary_color" SET DATA TYPE "public"."enum_business_themes_primary_color" USING "primary_color"::"public"."enum_business_themes_primary_color";
  ALTER TABLE "business_themes" ALTER COLUMN "secondary_color" SET DATA TYPE "public"."enum_business_themes_secondary_color" USING "secondary_color"::"public"."enum_business_themes_secondary_color";
  ALTER TABLE "business_themes" ALTER COLUMN "accent_color" SET DATA TYPE "public"."enum_business_themes_accent_color" USING "accent_color"::"public"."enum_business_themes_accent_color";
  ALTER TABLE "business_themes" ADD COLUMN "light_background_type" "enum_business_themes_light_background_type" DEFAULT 'color';
  ALTER TABLE "business_themes" ADD COLUMN "light_background_color" "enum_business_themes_light_background_color";
  ALTER TABLE "business_themes" ADD COLUMN "light_background_image_id" uuid;
  ALTER TABLE "business_themes" ADD COLUMN "dark_background" "enum_business_themes_dark_background" DEFAULT '#111827';
  ALTER TABLE "about_business" ADD COLUMN "tenant_id" uuid;
  ALTER TABLE "about_business" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "about_business_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "section_titles_id" uuid;
  ALTER TABLE "section_titles" ADD CONSTRAINT "section_titles_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "section_titles_locales" ADD CONSTRAINT "section_titles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."section_titles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "section_titles_tenant_idx" ON "section_titles" USING btree ("tenant_id");
  CREATE UNIQUE INDEX "section_titles_section_type_idx" ON "section_titles" USING btree ("section_type");
  CREATE INDEX "section_titles_updated_at_idx" ON "section_titles" USING btree ("updated_at");
  CREATE INDEX "section_titles_created_at_idx" ON "section_titles" USING btree ("created_at");
  CREATE UNIQUE INDEX "section_titles_locales_locale_parent_id_unique" ON "section_titles_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "business_themes" ADD CONSTRAINT "business_themes_light_background_image_id_media_id_fk" FOREIGN KEY ("light_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_business" ADD CONSTRAINT "about_business_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_about_business_fk" FOREIGN KEY ("about_business_id") REFERENCES "public"."about_business"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_section_titles_fk" FOREIGN KEY ("section_titles_id") REFERENCES "public"."section_titles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "business_themes_light_background_light_background_image_idx" ON "business_themes" USING btree ("light_background_image_id");
  CREATE INDEX "about_business_tenant_idx" ON "about_business" USING btree ("tenant_id");
  CREATE INDEX "about_business_updated_at_idx" ON "about_business" USING btree ("updated_at");
  CREATE INDEX "about_business_created_at_idx" ON "about_business" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_about_business_id_idx" ON "payload_locked_documents_rels" USING btree ("about_business_id");
  CREATE INDEX "payload_locked_documents_rels_section_titles_id_idx" ON "payload_locked_documents_rels" USING btree ("section_titles_id");
  ALTER TABLE "about_business" DROP COLUMN "about_description";
  ALTER TABLE "about_business" DROP COLUMN "is_active";
  ALTER TABLE "image_galleries" DROP COLUMN "is_active";
  ALTER TABLE "contact_departments" DROP COLUMN "is_active";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "about_section_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
   CREATE TABLE "about_section" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"about_description" varchar NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "about_business" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "section_titles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "section_titles_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "about_business" CASCADE;
  DROP TABLE "section_titles" CASCADE;
  DROP TABLE "section_titles_locales" CASCADE;
  ALTER TABLE "business_themes" DROP CONSTRAINT "business_themes_light_background_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_about_business_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_section_titles_fk";
  
  DROP INDEX "business_themes_light_background_light_background_image_idx";
  DROP INDEX "payload_locked_documents_rels_about_business_id_idx";
  DROP INDEX "payload_locked_documents_rels_section_titles_id_idx";
  ALTER TABLE "business_themes" ALTER COLUMN "primary_color" SET DATA TYPE varchar;
  ALTER TABLE "business_themes" ALTER COLUMN "secondary_color" SET DATA TYPE varchar;
  ALTER TABLE "business_themes" ALTER COLUMN "accent_color" SET DATA TYPE varchar;
  ALTER TABLE "business_themes" ADD COLUMN "background_color" varchar;
  ALTER TABLE "image_galleries" ADD COLUMN "is_active" boolean DEFAULT true;
  ALTER TABLE "contact_departments" ADD COLUMN "is_active" boolean DEFAULT true;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "about_section_id" uuid;
  CREATE INDEX "about_section_updated_at_idx" ON "about_section" USING btree ("updated_at");
  CREATE INDEX "about_section_created_at_idx" ON "about_section" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_about_section_fk" FOREIGN KEY ("about_section_id") REFERENCES "public"."about_section"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_about_section_id_idx" ON "payload_locked_documents_rels" USING btree ("about_section_id");
  ALTER TABLE "business_themes" DROP COLUMN "name";
  ALTER TABLE "business_themes" DROP COLUMN "light_background_type";
  ALTER TABLE "business_themes" DROP COLUMN "light_background_color";
  ALTER TABLE "business_themes" DROP COLUMN "light_background_image_id";
  ALTER TABLE "business_themes" DROP COLUMN "dark_background";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "about_business_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "section_titles_id";
  DROP TYPE "public"."enum_business_themes_light_background_type";
  DROP TYPE "public"."enum_business_themes_light_background_color";
  DROP TYPE "public"."enum_business_themes_dark_background";
  DROP TYPE "public"."enum_business_themes_primary_color";
  DROP TYPE "public"."enum_business_themes_secondary_color";
  DROP TYPE "public"."enum_business_themes_accent_color";
  DROP TYPE "public"."enum_section_titles_section_type";`)
}
