import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "download_links" ALTER COLUMN "android_link" DROP DEFAULT;
  ALTER TABLE "download_links" ALTER COLUMN "ios_link" DROP DEFAULT;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "download_links" ALTER COLUMN "android_link" SET DEFAULT 'https://play.google.com/store/apps/details?id=com.yourapp';
  ALTER TABLE "download_links" ALTER COLUMN "ios_link" SET DEFAULT 'https://apps.apple.com/app/id123456789';`)
}
