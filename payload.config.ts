import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

import { Users } from './src/collections/Users';
import { Categories } from './src/collections/Categories';
import { Products } from './src/collections/Products';
import { SampleRequests } from './src/collections/SampleRequests';
import { WholesaleRFQs } from './src/collections/WholesaleRFQs';
import { Pages } from './src/collections/Pages';
import { SiteSettings } from './src/collections/SiteSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const dbUri = process.env.POSTGRES_URL || process.env.DATABASE_URI || 'file:./ecolates.db';
const isPostgres = dbUri.startsWith('postgres://') || dbUri.startsWith('postgresql://');

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
  cors: ['http://localhost:3001', 'http://127.0.0.1:3001', process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: ['http://localhost:3001', 'http://127.0.0.1:3001', process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Ecolates Admin Portal',
    },
  },
  collections: [
    Products,
    Categories,
    Pages,
    SiteSettings,
    SampleRequests,
    WholesaleRFQs,
    Users,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'ecolates_b2b_sugarcane_tableware_secret_key_2026_super_secure',
  db: isPostgres
    ? postgresAdapter({
        pool: {
          connectionString: dbUri,
        },
      })
    : sqliteAdapter({
        client: {
          url: dbUri,
        },
      }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
