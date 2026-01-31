import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres"

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
   CREATE TABLE "business_profile_locales" (
  	"business_name" varchar NOT NULL,
  	"slogan" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "about_business_locales" (
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "contact_departments_locales" (
  	"title" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "social_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "business_partners_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "business_locations_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "tenant_link_configuration" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid NOT NULL,
  	"static_url" varchar NOT NULL,
  	"qr_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "business_themes" ALTER COLUMN "light_background_color" SET DATA TYPE varchar;
  ALTER TABLE "business_themes" ALTER COLUMN "light_background_color" SET DEFAULT '#FFFFFF';
  ALTER TABLE "business_themes" ALTER COLUMN "dark_background_color" SET DATA TYPE varchar;
  ALTER TABLE "business_themes" ALTER COLUMN "dark_background_color" SET DEFAULT '#000000';
  ALTER TABLE "business_themes" ALTER COLUMN "primary_color" SET DATA TYPE varchar;
  ALTER TABLE "business_themes" ALTER COLUMN "primary_color" SET DEFAULT '#3B82F6';
  ALTER TABLE "business_themes" ALTER COLUMN "primary_color" DROP NOT NULL;
  ALTER TABLE "business_themes" ALTER COLUMN "secondary_color" SET DATA TYPE varchar;
  ALTER TABLE "business_themes" ALTER COLUMN "secondary_color" SET DEFAULT '#6B7280';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tenant_link_configuration_id" uuid;
  ALTER TABLE "business_profile_locales" ADD CONSTRAINT "business_profile_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."business_profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_business_locales" ADD CONSTRAINT "about_business_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_business"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_departments_locales" ADD CONSTRAINT "contact_departments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "social_links_locales" ADD CONSTRAINT "social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "business_partners_locales" ADD CONSTRAINT "business_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."business_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "business_locations_locales" ADD CONSTRAINT "business_locations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."business_locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tenant_link_configuration" ADD CONSTRAINT "tenant_link_configuration_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "business_profile_locales_locale_parent_id_unique" ON "business_profile_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "about_business_locales_locale_parent_id_unique" ON "about_business_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_departments_locales_locale_parent_id_unique" ON "contact_departments_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "social_links_locales_locale_parent_id_unique" ON "social_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "business_partners_locales_locale_parent_id_unique" ON "business_partners_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "business_locations_locales_locale_parent_id_unique" ON "business_locations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tenant_link_configuration_tenant_idx" ON "tenant_link_configuration" USING btree ("tenant_id");
  CREATE INDEX "tenant_link_configuration_updated_at_idx" ON "tenant_link_configuration" USING btree ("updated_at");
  CREATE INDEX "tenant_link_configuration_created_at_idx" ON "tenant_link_configuration" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_configuration_fk" FOREIGN KEY ("tenant_link_configuration_id") REFERENCES "public"."tenant_link_configuration"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_tenant_link_configuration__idx" ON "payload_locked_documents_rels" USING btree ("tenant_link_configuration_id");
  ALTER TABLE "business_profile" DROP COLUMN "business_name";
  ALTER TABLE "business_profile" DROP COLUMN "slogan";
  ALTER TABLE "about_business" DROP COLUMN "description";
  ALTER TABLE "contact_departments" DROP COLUMN "title";
  ALTER TABLE "contact_departments" DROP COLUMN "phone";
  ALTER TABLE "contact_departments" DROP COLUMN "icon";
  ALTER TABLE "social_links" DROP COLUMN "label";
  ALTER TABLE "business_partners" DROP COLUMN "name";
  ALTER TABLE "business_locations" DROP COLUMN "title";
  ALTER TABLE "business_locations" DROP COLUMN "description";
  DROP TYPE "public"."enum_business_themes_light_background_color";
  DROP TYPE "public"."enum_business_themes_dark_background_color";
  DROP TYPE "public"."enum_business_themes_primary_color";
  DROP TYPE "public"."enum_business_themes_secondary_color";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
   CREATE TYPE "public"."enum_business_themes_light_background_color" AS ENUM('#3B82F6', '#136c36', '#c30811', '#FACC15', '#8B5CF6', '#EC4899', '#6B7280', '#FCE7F3', '#DBEAFE', '#D1FAE5', '#E9D5FF', '#FFEDD5', '#E0F2FE', '#F3F4F6', '#FEF3C7', '#FECDD3', '#CCFBF1', '#1E40AF', '#4B5563', '#065F46', '#EA580C', '#7C3AED', '#0D9488', '#B45309', '#1F2937', '#2563EB', '#15803D');
  CREATE TYPE "public"."enum_business_themes_dark_background_color" AS ENUM('#3B82F6', '#136c36', '#c30811', '#FACC15', '#8B5CF6', '#EC4899', '#6B7280', '#FCE7F3', '#DBEAFE', '#D1FAE5', '#E9D5FF', '#FFEDD5', '#E0F2FE', '#F3F4F6', '#FEF3C7', '#FECDD3', '#CCFBF1', '#1E40AF', '#4B5563', '#065F46', '#EA580C', '#7C3AED', '#0D9488', '#B45309', '#1F2937', '#2563EB', '#15803D');
  CREATE TYPE "public"."enum_business_themes_primary_color" AS ENUM('#3B82F6', '#136c36', '#c30811', '#FACC15', '#8B5CF6', '#EC4899', '#6B7280', '#FCE7F3', '#DBEAFE', '#D1FAE5', '#E9D5FF', '#FFEDD5', '#E0F2FE', '#F3F4F6', '#FEF3C7', '#FECDD3', '#CCFBF1', '#1E40AF', '#4B5563', '#065F46', '#EA580C', '#7C3AED', '#0D9488', '#B45309', '#1F2937', '#2563EB', '#15803D');
  CREATE TYPE "public"."enum_business_themes_secondary_color" AS ENUM('#3B82F6', '#136c36', '#c30811', '#FACC15', '#8B5CF6', '#EC4899', '#6B7280', '#FCE7F3', '#DBEAFE', '#D1FAE5', '#E9D5FF', '#FFEDD5', '#E0F2FE', '#F3F4F6', '#FEF3C7', '#FECDD3', '#CCFBF1', '#1E40AF', '#4B5563', '#065F46', '#EA580C', '#7C3AED', '#0D9488', '#B45309', '#1F2937', '#2563EB', '#15803D');
  ALTER TABLE "business_profile_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_business_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_departments_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "social_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "business_partners_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "business_locations_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tenant_link_configuration" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "business_profile_locales" CASCADE;
  DROP TABLE "about_business_locales" CASCADE;
  DROP TABLE "contact_departments_locales" CASCADE;
  DROP TABLE "social_links_locales" CASCADE;
  DROP TABLE "business_partners_locales" CASCADE;
  DROP TABLE "business_locations_locales" CASCADE;
  DROP TABLE "tenant_link_configuration" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_configuration_fk";
  
  DROP INDEX "payload_locked_documents_rels_tenant_link_configuration__idx";
  ALTER TABLE "business_themes" ALTER COLUMN "light_background_color" SET DATA TYPE "public"."enum_business_themes_light_background_color" USING "light_background_color"::"public"."enum_business_themes_light_background_color";
  ALTER TABLE "business_themes" ALTER COLUMN "light_background_color" DROP DEFAULT;
  ALTER TABLE "business_themes" ALTER COLUMN "dark_background_color" SET DATA TYPE "public"."enum_business_themes_dark_background_color" USING "dark_background_color"::"public"."enum_business_themes_dark_background_color";
  ALTER TABLE "business_themes" ALTER COLUMN "dark_background_color" DROP DEFAULT;
  ALTER TABLE "business_themes" ALTER COLUMN "primary_color" SET DATA TYPE "public"."enum_business_themes_primary_color" USING "primary_color"::"public"."enum_business_themes_primary_color";
  ALTER TABLE "business_themes" ALTER COLUMN "primary_color" DROP DEFAULT;
  ALTER TABLE "business_themes" ALTER COLUMN "primary_color" SET NOT NULL;
  ALTER TABLE "business_themes" ALTER COLUMN "secondary_color" SET DATA TYPE "public"."enum_business_themes_secondary_color" USING "secondary_color"::"public"."enum_business_themes_secondary_color";
  ALTER TABLE "business_themes" ALTER COLUMN "secondary_color" DROP DEFAULT;
  ALTER TABLE "business_profile" ADD COLUMN "business_name" varchar NOT NULL;
  ALTER TABLE "business_profile" ADD COLUMN "slogan" varchar;
  ALTER TABLE "about_business" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "contact_departments" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "contact_departments" ADD COLUMN "phone" varchar NOT NULL;
  ALTER TABLE "contact_departments" ADD COLUMN "icon" varchar;
  ALTER TABLE "social_links" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "business_partners" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "business_locations" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "business_locations" ADD COLUMN "description" varchar;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tenant_link_configuration_id";`)
}
