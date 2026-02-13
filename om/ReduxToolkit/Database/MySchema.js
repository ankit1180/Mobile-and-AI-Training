import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const MySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'notes', 
      columns: [
        { name: 'note', type: 'string' }, 
        { name: 'description', type: 'string' }, 
      
        { name: 'created_at', type: 'number' }
      ]
    })
  ]
});
