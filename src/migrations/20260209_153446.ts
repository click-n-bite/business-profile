import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "social_links" ADD COLUMN "image_id" uuid NOT NULL;
  ALTER TABLE "social_links" ADD COLUMN "url" varchar NOT NULL;
  ALTER TABLE "social_links" ADD COLUMN "order" numeric DEFAULT 0;
  ALTER TABLE "social_links" ADD CONSTRAINT "social_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "social_links_image_idx" ON "social_links" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "social_links" DROP CONSTRAINT "social_links_image_id_media_id_fk";
  
  DROP INDEX "social_links_image_idx";
  ALTER TABLE "social_links" DROP COLUMN "image_id";
  ALTER TABLE "social_links" DROP COLUMN "url";
  ALTER TABLE "social_links" DROP COLUMN "order";`)
}
