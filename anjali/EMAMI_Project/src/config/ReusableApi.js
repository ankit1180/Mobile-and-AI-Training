import { database } from '../Data/database';

export const createRecord = async (tableName, data) => {
  try {
    let record;

    await database.write(async () => {
      const collection = database.collections.get(tableName);

      record = await collection.create(item => {
        Object.keys(data).forEach(key => {
          item._raw[key] = data[key];
        });
      });
    });

    return record;
  } catch (error) {
    console.log('Create Error:', error);
  }
};

export const fetchRecords = (tableName, setData) => {
  const collection = database.collections.get(tableName);

  collection
    .query()
    .observe()
    .subscribe(items => {
      const temp = items.map(item => ({
        id: item.id,
        ...item._raw,
      }));

      setData(temp);
    });
};

export const updateRecord = async (tableName, id, updatedData) => {
  try {
    await database.write(async () => {
      const collection = database.collections.get(tableName);
      const record = await collection.find(id);

      await record.update(item => {
        Object.keys(updatedData).forEach(key => {
          // item[key]   updatedData[key];
          item._raw[key] = updatedData[key];
        });
      });
    });
  } catch (error) {
    console.log('Update Error:', error);
  }
};

export const deleteRecord = async (tableName, id) => {
  try {
    await database.write(async () => {
      const collection = database.collections.get(tableName);
      const record = await collection.find(id);

      await record.markAsDeleted();
    });
  } catch (error) {
    console.log('Delete Error:', error);
  }
};
