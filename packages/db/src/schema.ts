import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const tenants = sqliteTable('tenants', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  plan: text('plan').notNull().default('gratis'), // gratis, pro, enterprise
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id),
  email: text('email').notNull().unique(),
  role: text('role').notNull().default('editor'), // admin, editor, author
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content'),
  metadata: text('metadata'), // JSON string
  status: text('status', { enum: ['draft', 'published'] }).default('draft'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const domains = sqliteTable('domains', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id),
  domain: text('domain').notNull().unique(), // e.g. customdomain.com
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const redirects = sqliteTable('redirects', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id),
  sourceUrl: text('source_url').notNull(),
  targetUrl: text('target_url').notNull(),
  statusCode: integer('status_code').notNull().default(301),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const transactions = sqliteTable('transactions', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id),
  type: text('type').notNull(), // 'plan_upgrade', 'theme', 'license'
  details: text('details'), // JSON string containing product name, price, etc.
  status: text('status').notNull().default('pending'), // 'pending', 'approved', 'rejected'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
});
