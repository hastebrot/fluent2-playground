// database-like key value store using indexeddb with get and set.
// keys are arrays of strings.
// it also has a list function that accepts subkeys and returns a list of values.

export interface Store {
  get(key: string[]): Promise<any>;
  set(key: string[], value: any): Promise<void>;
  list(subkey: string[]): Promise<any[]>;
}

export const createStore = (): Store => {
  const dbPromise = indexedDB.open("store", 1);
  const dbReady = new Promise<IDBDatabase>((resolve, reject) => {
    dbPromise.onsuccess = (e) => {
      resolve((e.target as IDBOpenDBRequest).result);
    };
    dbPromise.onerror = reject;
    dbPromise.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      db.createObjectStore("store");
    };
  });

  const get = async (key: string[]) => {
    const db = await dbReady;
    const tx = db.transaction("store", "readonly");
    const store = tx.objectStore("store");
    const req = store.get(JSON.stringify(key));
    const res = await new Promise<any>((resolve, reject) => {
      req.onsuccess = () => resolve(req.result);
      req.onerror = reject;
    });
    return res;
  };

  const set = async (key: string[], value: any) => {
    const db = await dbReady;
    const tx = db.transaction("store", "readwrite");
    const store = tx.objectStore("store");
    const req = store.put(value, JSON.stringify(key));
    await new Promise<void>((resolve, reject) => {
      req.onsuccess = () => resolve();
      req.onerror = reject;
    });
  };

  const list = async (subkey: string[]) => {
    const db = await dbReady;
    const tx = db.transaction("store", "readonly");
    const store = tx.objectStore("store");
    const req = store.openCursor();
    const results: any[] = [];
    await new Promise<void>((resolve, reject) => {
      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          const key = JSON.parse(cursor.key);
          if (key.length >= subkey.length && key.slice(0, subkey.length).join() === subkey.join()) {
            results.push({ key, value: cursor.value });
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
      req.onerror = reject;
    });
    return results;
  };

  return { get, set, list };
};
