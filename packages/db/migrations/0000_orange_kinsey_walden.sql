CREATE TABLE `analytics` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`path` text NOT NULL,
	`views` integer DEFAULT 1 NOT NULL,
	`last_visited_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`cover_image` text,
	`price` integer DEFAULT 0 NOT NULL,
	`is_published` integer DEFAULT false,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `domains` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text,
	`domain` text NOT NULL,
	`is_active` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `enrollments` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`course_id` text NOT NULL,
	`student_email` text NOT NULL,
	`access_token` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`course_id` text NOT NULL,
	`title` text NOT NULL,
	`content` text,
	`order_index` integer DEFAULT 0 NOT NULL,
	`is_preview` integer DEFAULT false,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`filename` text NOT NULL,
	`url` text NOT NULL,
	`type` text NOT NULL,
	`size` integer NOT NULL,
	`has_watermark` integer DEFAULT false,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`product_id` text NOT NULL,
	`customer_name` text NOT NULL,
	`customer_phone` text NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`total_price` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`content` text,
	`metadata` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`is_premium` integer DEFAULT false,
	`price` integer DEFAULT 0,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`name` text NOT NULL,
	`price` integer NOT NULL,
	`description` text,
	`stock` integer DEFAULT 0,
	`image_url` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `redirects` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text,
	`source_url` text NOT NULL,
	`target_url` text NOT NULL,
	`status_code` integer DEFAULT 301 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tenants` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`plan` text DEFAULT 'gratis' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`expires_at` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text,
	`type` text NOT NULL,
	`details` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'editor' NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `analytics_path_unique` ON `analytics` (`path`);--> statement-breakpoint
CREATE UNIQUE INDEX `courses_slug_unique` ON `courses` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `domains_domain_unique` ON `domains` (`domain`);--> statement-breakpoint
CREATE UNIQUE INDEX `enrollments_access_token_unique` ON `enrollments` (`access_token`);--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);