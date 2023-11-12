import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Attempting to put content into the database...');
  // Create a connection to the database database and version we want to use.
  const db = await openDB('jate', 1);

    // Create a new transaction and specify the database and data privileges.
  const tx = db.transaction('jate', 'readwrite');

   // Open up the desired object store.
  const store = tx.objectStore('jate');
  
  await store.put(content);
  await tx.done;
  console.log('Content successfully added to the database:', content);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Attempting to get all content from the database...');
  // Create a connection to the database database and version we want to use.
  const db = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = db.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const allContent = await store.getAll();
  console.log('All content successfully retrieved from the database:', allContent);
  return allContent;
};

initdb();
