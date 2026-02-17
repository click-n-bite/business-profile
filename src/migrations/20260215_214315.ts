import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_users_role" AS ENUM('super-admin', 'user');
  CREATE TYPE "public"."enum_tenants_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tenants_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tenants_v_published_locale" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_business_themes_light_background_type" AS ENUM('color', 'image');
  CREATE TYPE "public"."enum_business_themes_dark_background_type" AS ENUM('color', 'image');
  CREATE TYPE "public"."enum_business_themes_theme_type" AS ENUM('business', 'personal');
  CREATE TYPE "public"."enum_section_titles_section_type" AS ENUM('about', 'contact', 'social', 'partners', 'locations', 'gallery', 'services', 'apps');
  CREATE TABLE "media" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"role" "enum_users_role" DEFAULT 'user',
  	"tenant_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "tenants" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_tenants_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_tenants_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__tenants_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__tenants_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "business_profile" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"logo_light_id" uuid,
  	"logo_dark_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "business_profile_locales" (
  	"business_name" varchar NOT NULL,
  	"slogan" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "business_themes" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"name" varchar NOT NULL,
  	"primary_color" varchar DEFAULT '#3B82F6',
  	"secondary_color" varchar DEFAULT '#6B7280',
  	"light_background_type" "enum_business_themes_light_background_type" DEFAULT 'color' NOT NULL,
  	"light_background_color" varchar DEFAULT '#FFFFFF',
  	"light_background_image_id" uuid,
  	"dark_background_type" "enum_business_themes_dark_background_type" DEFAULT 'color' NOT NULL,
  	"dark_background_color" varchar DEFAULT '#000000',
  	"dark_background_image_id" uuid,
  	"theme_type" "enum_business_themes_theme_type" DEFAULT 'business' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "about_business" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "about_business_locales" (
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "image_galleries_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid NOT NULL
  );
  
  CREATE TABLE "image_galleries" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_delay" numeric DEFAULT 5000,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_departments" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"whatsapp" boolean DEFAULT false,
  	"telegram" boolean DEFAULT false,
  	"sms" boolean DEFAULT false,
  	"telephone" boolean DEFAULT false,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_departments_locales" (
  	"title" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "social_links" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"image_id" uuid NOT NULL,
  	"url" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "social_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "business_services" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"url" varchar,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "business_services_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"url_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "business_partners" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"logo_id" uuid NOT NULL,
  	"website" varchar,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "business_partners_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "business_locations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"google_map_link" varchar,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "business_locations_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
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
  
  CREATE TABLE "tenant_link_configuration" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid NOT NULL,
  	"static_url" varchar NOT NULL,
  	"qr_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partners_carousel_settings" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "download_links" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"ios_link" varchar,
  	"android_link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" uuid,
  	"users_id" uuid,
  	"tenants_id" uuid,
  	"business_profile_id" uuid,
  	"business_themes_id" uuid,
  	"about_business_id" uuid,
  	"image_galleries_id" uuid,
  	"contact_departments_id" uuid,
  	"social_links_id" uuid,
  	"business_services_id" uuid,
  	"business_partners_id" uuid,
  	"business_locations_id" uuid,
  	"section_titles_id" uuid,
  	"tenant_link_configuration_id" uuid,
  	"partners_carousel_settings_id" uuid,
  	"download_links_id" uuid
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "media" ADD CONSTRAINT "media_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tenants_v" ADD CONSTRAINT "_tenants_v_parent_id_tenants_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "business_profile" ADD CONSTRAINT "business_profile_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "business_profile" ADD CONSTRAINT "business_profile_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "business_profile" ADD CONSTRAINT "business_profile_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "business_profile_locales" ADD CONSTRAINT "business_profile_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."business_profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "business_themes" ADD CONSTRAINT "business_themes_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "business_themes" ADD CONSTRAINT "business_themes_light_background_image_id_media_id_fk" FOREIGN KEY ("light_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "business_themes" ADD CONSTRAINT "business_themes_dark_background_image_id_media_id_fk" FOREIGN KEY ("dark_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_business" ADD CONSTRAINT "about_business_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_business_locales" ADD CONSTRAINT "about_business_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_business"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "image_galleries_images" ADD CONSTRAINT "image_galleries_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "image_galleries_images" ADD CONSTRAINT "image_galleries_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."image_galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "image_galleries" ADD CONSTRAINT "image_galleries_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_departments" ADD CONSTRAINT "contact_departments_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_departments_locales" ADD CONSTRAINT "contact_departments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "social_links" ADD CONSTRAINT "social_links_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "social_links" ADD CONSTRAINT "social_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "social_links_locales" ADD CONSTRAINT "social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "business_services" ADD CONSTRAINT "business_services_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "business_services_locales" ADD CONSTRAINT "business_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."business_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "business_partners" ADD CONSTRAINT "business_partners_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "business_partners" ADD CONSTRAINT "business_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "business_partners_locales" ADD CONSTRAINT "business_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."business_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "business_locations" ADD CONSTRAINT "business_locations_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "business_locations_locales" ADD CONSTRAINT "business_locations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."business_locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "section_titles" ADD CONSTRAINT "section_titles_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "section_titles_locales" ADD CONSTRAINT "section_titles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."section_titles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tenant_link_configuration" ADD CONSTRAINT "tenant_link_configuration_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_carousel_settings" ADD CONSTRAINT "partners_carousel_settings_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "download_links" ADD CONSTRAINT "download_links_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_business_profile_fk" FOREIGN KEY ("business_profile_id") REFERENCES "public"."business_profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_business_themes_fk" FOREIGN KEY ("business_themes_id") REFERENCES "public"."business_themes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_about_business_fk" FOREIGN KEY ("about_business_id") REFERENCES "public"."about_business"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_image_galleries_fk" FOREIGN KEY ("image_galleries_id") REFERENCES "public"."image_galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_departments_fk" FOREIGN KEY ("contact_departments_id") REFERENCES "public"."contact_departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_social_links_fk" FOREIGN KEY ("social_links_id") REFERENCES "public"."social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_business_services_fk" FOREIGN KEY ("business_services_id") REFERENCES "public"."business_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_business_partners_fk" FOREIGN KEY ("business_partners_id") REFERENCES "public"."business_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_business_locations_fk" FOREIGN KEY ("business_locations_id") REFERENCES "public"."business_locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_section_titles_fk" FOREIGN KEY ("section_titles_id") REFERENCES "public"."section_titles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_configuration_fk" FOREIGN KEY ("tenant_link_configuration_id") REFERENCES "public"."tenant_link_configuration"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_carousel_settings_fk" FOREIGN KEY ("partners_carousel_settings_id") REFERENCES "public"."partners_carousel_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_download_links_fk" FOREIGN KEY ("download_links_id") REFERENCES "public"."download_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_tenant_idx" ON "media" USING btree ("tenant_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_tenant_idx" ON "users" USING btree ("tenant_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "tenants_slug_idx" ON "tenants" USING btree ("slug");
  CREATE INDEX "tenants_updated_at_idx" ON "tenants" USING btree ("updated_at");
  CREATE INDEX "tenants_created_at_idx" ON "tenants" USING btree ("created_at");
  CREATE INDEX "tenants__status_idx" ON "tenants" USING btree ("_status");
  CREATE INDEX "_tenants_v_parent_idx" ON "_tenants_v" USING btree ("parent_id");
  CREATE INDEX "_tenants_v_version_version_slug_idx" ON "_tenants_v" USING btree ("version_slug");
  CREATE INDEX "_tenants_v_version_version_updated_at_idx" ON "_tenants_v" USING btree ("version_updated_at");
  CREATE INDEX "_tenants_v_version_version_created_at_idx" ON "_tenants_v" USING btree ("version_created_at");
  CREATE INDEX "_tenants_v_version_version__status_idx" ON "_tenants_v" USING btree ("version__status");
  CREATE INDEX "_tenants_v_created_at_idx" ON "_tenants_v" USING btree ("created_at");
  CREATE INDEX "_tenants_v_updated_at_idx" ON "_tenants_v" USING btree ("updated_at");
  CREATE INDEX "_tenants_v_snapshot_idx" ON "_tenants_v" USING btree ("snapshot");
  CREATE INDEX "_tenants_v_published_locale_idx" ON "_tenants_v" USING btree ("published_locale");
  CREATE INDEX "_tenants_v_latest_idx" ON "_tenants_v" USING btree ("latest");
  CREATE INDEX "business_profile_tenant_idx" ON "business_profile" USING btree ("tenant_id");
  CREATE INDEX "business_profile_logo_light_idx" ON "business_profile" USING btree ("logo_light_id");
  CREATE INDEX "business_profile_logo_dark_idx" ON "business_profile" USING btree ("logo_dark_id");
  CREATE INDEX "business_profile_updated_at_idx" ON "business_profile" USING btree ("updated_at");
  CREATE INDEX "business_profile_created_at_idx" ON "business_profile" USING btree ("created_at");
  CREATE UNIQUE INDEX "business_profile_locales_locale_parent_id_unique" ON "business_profile_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "business_themes_tenant_idx" ON "business_themes" USING btree ("tenant_id");
  CREATE INDEX "business_themes_light_background_light_background_image_idx" ON "business_themes" USING btree ("light_background_image_id");
  CREATE INDEX "business_themes_dark_background_dark_background_image_idx" ON "business_themes" USING btree ("dark_background_image_id");
  CREATE INDEX "business_themes_updated_at_idx" ON "business_themes" USING btree ("updated_at");
  CREATE INDEX "business_themes_created_at_idx" ON "business_themes" USING btree ("created_at");
  CREATE INDEX "about_business_tenant_idx" ON "about_business" USING btree ("tenant_id");
  CREATE INDEX "about_business_updated_at_idx" ON "about_business" USING btree ("updated_at");
  CREATE INDEX "about_business_created_at_idx" ON "about_business" USING btree ("created_at");
  CREATE UNIQUE INDEX "about_business_locales_locale_parent_id_unique" ON "about_business_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "image_galleries_images_order_idx" ON "image_galleries_images" USING btree ("_order");
  CREATE INDEX "image_galleries_images_parent_id_idx" ON "image_galleries_images" USING btree ("_parent_id");
  CREATE INDEX "image_galleries_images_image_idx" ON "image_galleries_images" USING btree ("image_id");
  CREATE INDEX "image_galleries_tenant_idx" ON "image_galleries" USING btree ("tenant_id");
  CREATE INDEX "image_galleries_updated_at_idx" ON "image_galleries" USING btree ("updated_at");
  CREATE INDEX "image_galleries_created_at_idx" ON "image_galleries" USING btree ("created_at");
  CREATE INDEX "contact_departments_tenant_idx" ON "contact_departments" USING btree ("tenant_id");
  CREATE INDEX "contact_departments_updated_at_idx" ON "contact_departments" USING btree ("updated_at");
  CREATE INDEX "contact_departments_created_at_idx" ON "contact_departments" USING btree ("created_at");
  CREATE UNIQUE INDEX "contact_departments_locales_locale_parent_id_unique" ON "contact_departments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "social_links_tenant_idx" ON "social_links" USING btree ("tenant_id");
  CREATE INDEX "social_links_image_idx" ON "social_links" USING btree ("image_id");
  CREATE INDEX "social_links_updated_at_idx" ON "social_links" USING btree ("updated_at");
  CREATE INDEX "social_links_created_at_idx" ON "social_links" USING btree ("created_at");
  CREATE UNIQUE INDEX "social_links_locales_locale_parent_id_unique" ON "social_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "business_services_tenant_idx" ON "business_services" USING btree ("tenant_id");
  CREATE INDEX "business_services_updated_at_idx" ON "business_services" USING btree ("updated_at");
  CREATE INDEX "business_services_created_at_idx" ON "business_services" USING btree ("created_at");
  CREATE UNIQUE INDEX "business_services_locales_locale_parent_id_unique" ON "business_services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "business_partners_tenant_idx" ON "business_partners" USING btree ("tenant_id");
  CREATE INDEX "business_partners_logo_idx" ON "business_partners" USING btree ("logo_id");
  CREATE INDEX "business_partners_updated_at_idx" ON "business_partners" USING btree ("updated_at");
  CREATE INDEX "business_partners_created_at_idx" ON "business_partners" USING btree ("created_at");
  CREATE UNIQUE INDEX "business_partners_locales_locale_parent_id_unique" ON "business_partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "business_locations_tenant_idx" ON "business_locations" USING btree ("tenant_id");
  CREATE INDEX "business_locations_updated_at_idx" ON "business_locations" USING btree ("updated_at");
  CREATE INDEX "business_locations_created_at_idx" ON "business_locations" USING btree ("created_at");
  CREATE UNIQUE INDEX "business_locations_locales_locale_parent_id_unique" ON "business_locations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "section_titles_tenant_idx" ON "section_titles" USING btree ("tenant_id");
  CREATE UNIQUE INDEX "section_titles_section_type_idx" ON "section_titles" USING btree ("section_type");
  CREATE INDEX "section_titles_updated_at_idx" ON "section_titles" USING btree ("updated_at");
  CREATE INDEX "section_titles_created_at_idx" ON "section_titles" USING btree ("created_at");
  CREATE UNIQUE INDEX "section_titles_locales_locale_parent_id_unique" ON "section_titles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tenant_link_configuration_tenant_idx" ON "tenant_link_configuration" USING btree ("tenant_id");
  CREATE INDEX "tenant_link_configuration_updated_at_idx" ON "tenant_link_configuration" USING btree ("updated_at");
  CREATE INDEX "tenant_link_configuration_created_at_idx" ON "tenant_link_configuration" USING btree ("created_at");
  CREATE INDEX "partners_carousel_settings_tenant_idx" ON "partners_carousel_settings" USING btree ("tenant_id");
  CREATE INDEX "partners_carousel_settings_updated_at_idx" ON "partners_carousel_settings" USING btree ("updated_at");
  CREATE INDEX "partners_carousel_settings_created_at_idx" ON "partners_carousel_settings" USING btree ("created_at");
  CREATE INDEX "download_links_tenant_idx" ON "download_links" USING btree ("tenant_id");
  CREATE INDEX "download_links_updated_at_idx" ON "download_links" USING btree ("updated_at");
  CREATE INDEX "download_links_created_at_idx" ON "download_links" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_tenants_id_idx" ON "payload_locked_documents_rels" USING btree ("tenants_id");
  CREATE INDEX "payload_locked_documents_rels_business_profile_id_idx" ON "payload_locked_documents_rels" USING btree ("business_profile_id");
  CREATE INDEX "payload_locked_documents_rels_business_themes_id_idx" ON "payload_locked_documents_rels" USING btree ("business_themes_id");
  CREATE INDEX "payload_locked_documents_rels_about_business_id_idx" ON "payload_locked_documents_rels" USING btree ("about_business_id");
  CREATE INDEX "payload_locked_documents_rels_image_galleries_id_idx" ON "payload_locked_documents_rels" USING btree ("image_galleries_id");
  CREATE INDEX "payload_locked_documents_rels_contact_departments_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_departments_id");
  CREATE INDEX "payload_locked_documents_rels_social_links_id_idx" ON "payload_locked_documents_rels" USING btree ("social_links_id");
  CREATE INDEX "payload_locked_documents_rels_business_services_id_idx" ON "payload_locked_documents_rels" USING btree ("business_services_id");
  CREATE INDEX "payload_locked_documents_rels_business_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("business_partners_id");
  CREATE INDEX "payload_locked_documents_rels_business_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("business_locations_id");
  CREATE INDEX "payload_locked_documents_rels_section_titles_id_idx" ON "payload_locked_documents_rels" USING btree ("section_titles_id");
  CREATE INDEX "payload_locked_documents_rels_tenant_link_configuration__idx" ON "payload_locked_documents_rels" USING btree ("tenant_link_configuration_id");
  CREATE INDEX "payload_locked_documents_rels_partners_carousel_settings_idx" ON "payload_locked_documents_rels" USING btree ("partners_carousel_settings_id");
  CREATE INDEX "payload_locked_documents_rels_download_links_id_idx" ON "payload_locked_documents_rels" USING btree ("download_links_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "tenants" CASCADE;
  DROP TABLE "_tenants_v" CASCADE;
  DROP TABLE "business_profile" CASCADE;
  DROP TABLE "business_profile_locales" CASCADE;
  DROP TABLE "business_themes" CASCADE;
  DROP TABLE "about_business" CASCADE;
  DROP TABLE "about_business_locales" CASCADE;
  DROP TABLE "image_galleries_images" CASCADE;
  DROP TABLE "image_galleries" CASCADE;
  DROP TABLE "contact_departments" CASCADE;
  DROP TABLE "contact_departments_locales" CASCADE;
  DROP TABLE "social_links" CASCADE;
  DROP TABLE "social_links_locales" CASCADE;
  DROP TABLE "business_services" CASCADE;
  DROP TABLE "business_services_locales" CASCADE;
  DROP TABLE "business_partners" CASCADE;
  DROP TABLE "business_partners_locales" CASCADE;
  DROP TABLE "business_locations" CASCADE;
  DROP TABLE "business_locations_locales" CASCADE;
  DROP TABLE "section_titles" CASCADE;
  DROP TABLE "section_titles_locales" CASCADE;
  DROP TABLE "tenant_link_configuration" CASCADE;
  DROP TABLE "partners_carousel_settings" CASCADE;
  DROP TABLE "download_links" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_tenants_status";
  DROP TYPE "public"."enum__tenants_v_version_status";
  DROP TYPE "public"."enum__tenants_v_published_locale";
  DROP TYPE "public"."enum_business_themes_light_background_type";
  DROP TYPE "public"."enum_business_themes_dark_background_type";
  DROP TYPE "public"."enum_business_themes_theme_type";
  DROP TYPE "public"."enum_section_titles_section_type";`)
}
