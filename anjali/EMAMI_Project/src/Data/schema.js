import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 3,
  tables: [
    tableSchema({
      name: 'products',
      columns: [
        { name: 'sf_id', type: 'string' },
        { name: 'product_name', type: 'string' },
        { name: 'image', type: 'string' },
        { name: 'price', type: 'number' },
        { name: 'stock_qty', type: 'number' },
        { name: 'category', type: 'string' },
      ],
    }),

    tableSchema({
      name: 'beatday',
      columns: [
        { name: 'sf_id', type: 'string' },
        { name: 'beat_day_name', type: 'string' },
        { name: 'beat_day_date', type: 'string' },
      ],
    }),

    tableSchema({
      name: 'visitdays',
      columns: [
        { name: 'sf_id', type: 'string' },
        // shows as dropdown according to beat name
        { name: 'beat_day_id', type: 'string', isIndexed: true },
        { name: 'visit_name', type: 'string' },
        { name: 'visit_owner_number', type: 'string' },
        { name: 'visit_store_name', type: 'string' },
        { name: 'visit_address', type: 'string' },
        { name: 'visit_latitude', type: 'number' },
        { name: 'visit_longitude', type: 'number' },
        { name: 'visit_class', type: 'string' },
        { name: 'visit_channel', type: 'string' },
        { name: 'visit_sub_channel', type: 'string' },

        // details
        { name: 'credit_limit', type: 'number' },
        { name: 'credit_days', type: 'number' },
        { name: 'last_ordered', type: 'string' },
        { name: 'distributor', type: 'string' },
      ],
    }),

    tableSchema({
      name: 'order',
      columns: [
        { name: 'sf_id', type: 'string' },
        { name: 'visit_id', type: 'string', isIndexed: true },
        { name: 'order_date', type: 'string' },
        { name: 'total_amount', type: 'number' },
      ],
    }),

    tableSchema({
      name: 'orderitem',
      columns: [
        { name: 'sf_id', type: 'string' },
        { name: 'order_id', type: 'string', isIndexed: true },
        { name: 'product_id', type: 'string', isIndexed: true },
        { name: 'quantity', type: 'number' },
      ],
    }),
  ],
});
