import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "app_links" RENAME TO "download_links";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "app_links_id" TO "download_links_id";
  ALTER TABLE "download_links" DROP CONSTRAINT "app_links_tenant_id_tenants_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_app_links_fk";
  
  DROP INDEX "app_links_tenant_idx";
  DROP INDEX "app_links_updated_at_idx";
  DROP INDEX "app_links_created_at_idx";
  DROP INDEX "payload_locked_documents_rels_app_links_id_idx";
  ALTER TABLE "download_links" ADD CONSTRAINT "download_links_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_download_links_fk" FOREIGN KEY ("download_links_id") REFERENCES "public"."download_links"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "download_links_tenant_idx" ON "download_links" USING btree ("tenant_id");
  CREATE INDEX "download_links_updated_at_idx" ON "download_links" USING btree ("updated_at");
  CREATE INDEX "download_links_created_at_idx" ON "download_links" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_download_links_id_idx" ON "payload_locked_documents_rels" USING btree ("download_links_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "download_links" RENAME TO "app_links";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "download_links_id" TO "app_links_id";
  ALTER TABLE "app_links" DROP CONSTRAINT "download_links_tenant_id_tenants_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_download_links_fk";
  
  DROP INDEX "download_links_tenant_idx";
  DROP INDEX "download_links_updated_at_idx";
  DROP INDEX "download_links_created_at_idx";
  DROP INDEX "payload_locked_documents_rels_download_links_id_idx";
  ALTER TABLE "app_links" ADD CONSTRAINT "app_links_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_app_links_fk" FOREIGN KEY ("app_links_id") REFERENCES "public"."app_links"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "app_links_tenant_idx" ON "app_links" USING btree ("tenant_id");
  CREATE INDEX "app_links_updated_at_idx" ON "app_links" USING btree ("updated_at");
  CREATE INDEX "app_links_created_at_idx" ON "app_links" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_app_links_id_idx" ON "payload_locked_documents_rels" USING btree ("app_links_id");`)
}
