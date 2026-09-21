import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema.ts',
  out: './migrations',
  driver: 'd1', // Meskipun driver utamanya d1, untuk generasi schema lokal kita bisa pakai generic sqlite atau d1
} satisfies Config;
