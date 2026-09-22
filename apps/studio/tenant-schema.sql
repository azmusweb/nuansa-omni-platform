CREATE TABLE IF NOT EXISTS `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL UNIQUE,
	`content` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);

-- Insert Default Settings
INSERT OR IGNORE INTO `settings` (`key`, `value`) VALUES ('siteName', 'Nuansa Omni-Platform');
INSERT OR IGNORE INTO `settings` (`key`, `value`) VALUES ('primaryColor', '#38bdf8');
