import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

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

export const domains = sqliteTable('domains', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id),
  domain: text('domain').notNull().unique(), // e.g. customdomain.com
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
