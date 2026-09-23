import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const tenants = sqliteTable('tenants', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  plan: text('plan').notNull().default('gratis'), // gratis, pro, enterprise
  status: text('status').notNull().default('active'), // active, suspended
  expiresAt: integer('expires_at', { mode: 'timestamp' }), // nullable
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').notNull().default('editor'), // admin, editor, author
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content'),
  metadata: text('metadata'),
  status: text('status').notNull().default('draft'),
  isPremium: integer('is_premium', { mode: 'boolean' }).default(false),
  price: integer('price').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  description: text('description'),
  stock: integer('stock').default(0),
  imageUrl: text('image_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
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

export const media = sqliteTable('media', {
  id: text('id').primaryKey(),
  filename: text('filename').notNull(),
  url: text('url').notNull(),
  type: text('type').notNull(), // 'image/png', 'image/jpeg', etc.
  size: integer('size').notNull(),
  hasWatermark: integer('has_watermark', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});

export const analytics = sqliteTable('analytics', {
  id: text('id').primaryKey(),
  path: text('path').notNull().unique(),
  views: integer('views').notNull().default(1),
  lastVisitedAt: integer('last_visited_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull(),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone').notNull(),
  quantity: integer('quantity').notNull().default(1),
  totalPrice: integer('total_price').notNull().default(0),
  status: text('status').notNull().default('pending'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});

// Nuansa Learn
export const courses = sqliteTable('courses', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  coverImage: text('cover_image'),
  price: integer('price').notNull().default(0),
  isPublished: integer('is_published', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});

export const lessons = sqliteTable('lessons', {
  id: text('id').primaryKey(),
  courseId: text('course_id').notNull(),
  title: text('title').notNull(),
  content: text('content'),
  orderIndex: integer('order_index').notNull().default(0),
  isPreview: integer('is_preview', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});

export const enrollments = sqliteTable('enrollments', {
  id: text('id').primaryKey(),
  courseId: text('course_id').notNull(),
  studentEmail: text('student_email').notNull(),
  accessToken: text('access_token').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});

export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});
