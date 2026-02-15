import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "download_links" ALTER COLUMN "android_link" DROP NOT NULL;
  ALTER TABLE "download_links" ALTER COLUMN "ios_link" DROP NOT NULL;
  ALTER TABLE "download_links" DROP COLUMN "title";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "download_links" ALTER COLUMN "ios_link" SET NOT NULL;
  ALTER TABLE "download_links" ALTER COLUMN "android_link" SET NOT NULL;
  ALTER TABLE "download_links" ADD COLUMN "title" varchar;`)
}
