import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_section_titles_section_type" ADD VALUE 'apps';
  CREATE TABLE "download_links" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"android_link" varchar DEFAULT 'https://play.google.com/store/apps/details?id=com.yourapp' NOT NULL,
  	"ios_link" varchar DEFAULT 'https://apps.apple.com/app/id123456789' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "business_services_locales" ADD COLUMN "url_name" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "download_links_id" uuid;
  ALTER TABLE "download_links" ADD CONSTRAINT "download_links_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "download_links_tenant_idx" ON "download_links" USING btree ("tenant_id");
  CREATE INDEX "download_links_updated_at_idx" ON "download_links" USING btree ("updated_at");
  CREATE INDEX "download_links_created_at_idx" ON "download_links" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_download_links_fk" FOREIGN KEY ("download_links_id") REFERENCES "public"."download_links"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_download_links_id_idx" ON "payload_locked_documents_rels" USING btree ("download_links_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "download_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "download_links" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_download_links_fk";
  
  ALTER TABLE "section_titles" ALTER COLUMN "section_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_section_titles_section_type";
  CREATE TYPE "public"."enum_section_titles_section_type" AS ENUM('about', 'contact', 'social', 'partners', 'locations', 'gallery', 'services');
  ALTER TABLE "section_titles" ALTER COLUMN "section_type" SET DATA TYPE "public"."enum_section_titles_section_type" USING "section_type"::"public"."enum_section_titles_section_type";
  DROP INDEX "payload_locked_documents_rels_download_links_id_idx";
  ALTER TABLE "business_services_locales" DROP COLUMN "url_name";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "download_links_id";`)
}
