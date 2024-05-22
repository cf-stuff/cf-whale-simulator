import LZString from "./lib/lz-string.min.js";


export const LS = {
  save: build => {
    const key = build.name;
    const compressed = LZString.compressToUTF16(JSON.stringify(build));
    localStorage.setItem(key, compressed);
  },
  load: key => {
    const compressed = localStorage.getItem(key);
    return compressed ? JSON.parse(LZString.decompressFromUTF16(compressed)) : null;
  },
  remove: key => localStorage.removeItem(key),
  getSavedKeys: () => Object.keys(localStorage)
    .filter(key => key !== "debug" || localStorage.getItem(key) !== "honey:core-sdk:*").sort()
};

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("sim", 1);

    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("builds")) {
        db.createObjectStore("builds", { keyPath: "name" });
      }
    };

    request.onsuccess = event => {
      resolve(event.target.result);
    };

    request.onerror = event => {
      reject(event.target.error);
    };
  });
};

export const DB = {
  save: async build => {
    const db = await openDatabase();
    const transaction = db.transaction("builds", "readwrite");
    const store = transaction.objectStore("builds");
    const key = build.name;
    const compressed = LZString.compressToUTF16(JSON.stringify(build));
    store.put({ name: key, data: compressed });

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        resolve();
      };
      transaction.onerror = event => {
        reject(event.target.error);
      };
    });
  },
  load: async key => {
    const db = await openDatabase();
    const transaction = db.transaction("builds", "readonly");
    const store = transaction.objectStore("builds");

    return new Promise((resolve, reject) => {
      const request = store.get(key);

      request.onsuccess = event => {
        const result = event.target.result;
        if (result) {
          resolve(JSON.parse(LZString.decompressFromUTF16(result.data)));
        } else {
          resolve(null);
        }
      };

      request.onerror = event => {
        reject(event.target.error);
      };
    });
  },
  remove: async key => {
    const db = await openDatabase();
    const transaction = db.transaction("builds", "readwrite");
    const store = transaction.objectStore("builds");
    store.delete(key);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        resolve();
      };
      transaction.onerror = event => {
        reject(event.target.error);
      };
    });
  },
  getSavedKeys: async () => {
    const db = await openDatabase();
    const transaction = db.transaction("builds", "readonly");
    const store = transaction.objectStore("builds");

    return new Promise((resolve, reject) => {
      const request = store.getAllKeys();

      request.onsuccess = event => {
        const keys = event.target.result;
        resolve(keys.sort());
      };

      request.onerror = event => {
        reject(event.target.error);
      };
    });
  }
}

const isIndexedDbEmpty = async () => {
  const db = await openDatabase();
  const transaction = db.transaction("builds", "readonly");
  const store = transaction.objectStore("builds");

  return new Promise((resolve, reject) => {
    const request = store.count();

    request.onsuccess = event => {
      resolve(event.target.result === 0);
    };

    request.onerror = event => {
      reject(event.target.error);
    };
  });
};

export const importFromLocalStorageIfEmpty = async () => {
  const empty = await isIndexedDbEmpty();
  if (empty) {
    const keys = LS.getSavedKeys();

    for (const key of keys) {
      const compressed = localStorage.getItem(key);
      if (compressed) {
        const build = JSON.parse(LZString.decompressFromUTF16(compressed));
        await DB.save(build);
      }
    }
  }
};

// importFromLocalStorageIfEmpty();
