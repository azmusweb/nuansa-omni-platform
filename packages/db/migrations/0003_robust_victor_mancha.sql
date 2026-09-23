ALTER TABLE tenants ADD `status` text DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE tenants ADD `expires_at` integer;