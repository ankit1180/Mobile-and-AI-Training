import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { mySchema } from './schema';
import { Product, BeatDay, VisitDay, Order, OrderItem } from './Model';

const adapter = new SQLiteAdapter({
  schema: mySchema,
});

export const database = new Database({
  adapter,
  modelClasses: [Product, BeatDay, VisitDay, Order, OrderItem],
});
