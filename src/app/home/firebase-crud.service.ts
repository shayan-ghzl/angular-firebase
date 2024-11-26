import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudService {
  /**
   *
   * Listening to Changes: Methods using valueChanges() or snapshotChanges() listen for realtime updates.
   * One - Time Fetch: CRUD operations(set, push, update, remove) are promise - based and execute one - time changes without automatic updates.
   * 
   */
  constructor(private db: AngularFireDatabase) { }

  /**
 * Get data from a list at a specific path (one-time fetch).
 * One-time fetch (non-reactive).
 * @param path Database path to fetch data from.
 */
  getListOnce(path: string): Promise<any> {
    return this.db.list(path).query.once('value');
  }

  /**
 * Get data once from a specific path.
 * One-time fetch (non-reactive). Returns a Promise.
 * @param path Database path to fetch data from.
 */
  getDataOnce(path: string): Promise<any> {
    return this.db.database.ref(path).get();
  }

  /**
   * Retrieve a list of items from the database.
   * 
   * Listening to Changes (Realtime Updates)
   * 
   * @param path - The path to the list in the database.
   * @returns Observable of the list of items as plain objects.
   */
  getList<T>(path: string): Observable<T[]> {
    return this.db.list<T>(path).valueChanges();
  };

  /**
   * Retrieve a list of items along with metadata such as keys and event types.
   * 
   * Listening to Changes (Realtime Updates)
   * 
   * @param path - The path to the list in the database.
   * @returns Observable of the list with metadata.
   */
  getListWithSnapshot<T>(path: string): Observable<any[]> {
    return this.db.list<T>(path).snapshotChanges();
  };

  /**
   * Retrieve a specific object from the database.
   * 
   * Listening to Changes (Realtime Updates)
   * 
   * @param path - The path to the object in the database.
   * @returns Observable of the object as plain data.
   */
  getObject<T>(path: string): Observable<T | null> {
    return this.db.object<T>(path).valueChanges();
  };

  /**
   * Retrieve a specific object with metadata.
   * 
   * Listening to Changes (Realtime Updates)
   * 
   * @param path - The path to the object in the database.
   * @returns Observable of the object with metadata.
   */
  getObjectWithSnapshot<T>(path: string): Observable<any> {
    return this.db.object<T>(path).snapshotChanges();
  };

  /**
 * Push a new record to a list at the specified path.
 * @param path Database path where the data should be added.
 * @param data The data to be added.
 */
  createWithPush<T>(path: string, data: T): Promise<void> {
    return this.db.list(path).push(data).then(() => { });
  }

  /**
   * Create a new item in the database list.
   * 
   * One-Time Fetch Method
   * 
   * @param path - The path to the list in the database.
   * @param data - The data to be added to the list.
   * @returns A promise indicating the success or failure of the operation.
   */
  createItem<T>(path: string, data: T): Promise<void> {
    const listRef = this.db.list(path);
    return listRef.push(data).then(() => { });
  };

  /**
 * Add or update a record at the specified path.
 * @param path Database path where the data should be written.
 * @param data The data to be saved.
 */
  createOrUpdate(path: string, data: any): Promise<void> {
    return this.db.object(path).set(data);
  }

  /**
   * Create a new item or update an existing one by specifying its key.
   * 
   *  One-Time Fetch Method
   * 
   * @param path - The path to the list in the database.
   * @param key - The unique key of the item.
   * @param data - The data to be saved.
   * @returns A promise indicating the success or failure of the operation.
   */
  setItem<T>(path: string, key: string, data: T): Promise<void> {
    const listRef = this.db.list(path);
    return listRef.set(key, data);
  };

  /**
   * Update an existing item in the database.
   * 
   *  One-Time Fetch Method
   * 
   * @param path - The path to the list in the database.
   * @param key - The unique key of the item.
   * @param data - The data to be updated.
   * @returns A promise indicating the success or failure of the operation.
   */
  updateItem<T>(path: string, key: string, data: Partial<T>): Promise<void> {
    const listRef = this.db.list(path);
    return listRef.update(key, data);
  };

  /**
 * Update a record at the specified path.
 * @param path Database path where the data should be updated.
 * @param data The data to update.
 */
  updateData<T>(path: string, data: Partial<T>): Promise<void> {
    return this.db.object(path).update(data);
  }

  /**
   * Delete an item from the database list.
   * 
   *  One-Time Fetch Method
   * 
   * @param path - The path to the list in the database.
   * @param key - The unique key of the item to be removed.
   * @returns A promise indicating the success or failure of the operation.
   */
  deleteListItem(path: string, key: string): Promise<void> {
    const listRef = this.db.list(path);
    return listRef.remove(key);
  };

  /**
 * Remove a record at the specified path.
 * @param path Database path to remove data from.
 */
  deleteData(path: string): Promise<void> {
    const objectRef = this.db.object(path);
    return objectRef.remove();
  }

  /**
   * Delete the entire list at the specified path.
   * 
   * One-Time Fetch Method
   * 
   * @param path - The path to the list in the database.
   * @returns A promise indicating the success or failure of the operation.
   */
  deleteList(path: string): Promise<void> {
    const listRef = this.db.list(path);
    return listRef.remove();
  };

  /**
   * Generate a unique ID for a new item (useful for client-side operations).
   * 
   *  One-Time Fetch Method
   * 
   * @returns A unique string ID.
   */
  createUniqueId(): string {
    return this.db.createPushId();
  }

  /**
   * Query a list with filtering, ordering, or limiting.
   * 
   * Listening to Changes (Realtime Updates)
   * 
   * @param path - The path to the list in the database.
   * @param queryFn - A query function to customize the database reference.
   * @returns Observable of the queried list as plain objects.
   */
  queryList<T>(path: string, queryFn: (ref: firebase.database.Reference) => firebase.database.Query): Observable<T[]> {
    return this.db.list<T>(path, queryFn).valueChanges();
  };

  /**
   * Query a list and retrieve metadata like keys.
   * 
   * Listening to Changes (Realtime Updates)
   * 
   * @param path - The path to the list in the database.
   * @param queryFn - A query function to customize the database reference.
   * @returns Observable of the queried list with metadata.
   */
  queryListWithSnapshot<T>(path: string, queryFn: (ref: firebase.database.Reference) => firebase.database.Query): Observable<any[]> {
    return this.db.list<T>(path, queryFn).snapshotChanges();
  }
}










































@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudServiceSecond {

  constructor(private db: AngularFireDatabase) { }

  // ----------------------- READ METHODS ----------------------------

  // One-time fetch for a list
  getListOnce(path: string): Promise<any> {
    return this.db.list(path).query.once('value');
  }

  // One-time fetch for a specific object
  getDataOnce(path: string): Promise<any> {
    return this.db.database.ref(path).get();
  }

  // Real-time listener for a list
  getList<T>(path: string): Observable<T[]> {
    return this.db.list<T>(path).valueChanges();
  }

  // Real-time listener for a list with metadata
  getListWithSnapshot<T>(path: string): Observable<any[]> {
    return this.db.list<T>(path).snapshotChanges();
  }

  // Real-time listener for a specific object
  getObject<T>(path: string): Observable<T | null> {
    return this.db.object<T>(path).valueChanges();
  }

  // Real-time listener for a specific object with metadata
  getObjectWithSnapshot<T>(path: string): Observable<any> {
    return this.db.object<T>(path).snapshotChanges();
  }

  // ---------------------- CREATE METHODS ----------------------------

  // Push a new record to a list (with auto-generated ID)
  createWithPush<T>(path: string, data: T): Promise<void> {
    return this.db.list(path).push(data).then(() => { });
  }

  // Set or add a new item by key (One-Time Fetch)
  setItem<T>(path: string, key: string, data: T): Promise<void> {
    const listRef = this.db.list(path);
    return listRef.set(key, data);
  }

  // Create or update a record (One-Time Fetch)
  createOrUpdate(path: string, data: any): Promise<void> {
    return this.db.object(path).set(data);
  }

  // ---------------------- UPDATE METHODS ----------------------------

  // Update an existing item by key (One-Time Fetch)
  updateItem<T>(path: string, key: string, data: Partial<T>): Promise<void> {
    const listRef = this.db.list(path);
    return listRef.update(key, data);
  }

  // Update a record at a path (One-Time Fetch)
  updateData<T>(path: string, data: Partial<T>): Promise<void> {
    return this.db.object(path).update(data);
  }

  // ---------------------- DELETE METHODS ----------------------------

  // Delete an item by key from a list (One-Time Fetch)
  deleteListItem(path: string, key: string): Promise<void> {
    const listRef = this.db.list(path);
    return listRef.remove(key);
  }

  // Delete a specific record (One-Time Fetch)
  deleteData(path: string): Promise<void> {
    return this.db.object(path).remove();
  }

  // Delete an entire list (One-Time Fetch)
  deleteList(path: string): Promise<void> {
    return this.db.list(path).remove();
  }

  // ----------------------- ADDITIONAL METHODS ----------------------

  // Generate a unique ID for a new item (client-side)
  createUniqueId(): string {
    return this.db.createPushId();
  }

  // Query a list with filters (Real-time listener)
  queryList<T>(path: string, queryFn: (ref: firebase.database.Reference) => firebase.database.Query): Observable<T[]> {
    return this.db.list<T>(path, queryFn).valueChanges();
  }

  // Query a list with metadata (Real-time listener)
  queryListWithSnapshot<T>(path: string, queryFn: (ref: firebase.database.Reference) => firebase.database.Query): Observable<any[]> {
    return this.db.list<T>(path, queryFn).snapshotChanges();
  }
}

