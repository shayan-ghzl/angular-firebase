import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { onDisconnect, onValue, push, ref, remove, serverTimestamp, set, update } from 'firebase/database';
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
  getList<T = any>(path: string): Observable<T[]> {
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
  getListWithSnapshot<T = any>(path: string): Observable<any[]> {
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
  getObject<T = any>(path: string): Observable<T | null> {
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
  getObjectWithSnapshot<T = any>(path: string): Observable<any> {
    return this.db.object<T>(path).snapshotChanges();
  };

  /**
 * Push a new record to a list at the specified path.
 * @param path Database path where the data should be added.
 * @param data The data to be added.
 */
  createWithPush<T = any>(path: string, data: T): Promise<void> {
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
  createItem<T = any>(path: string, data: T): Promise<void> {
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
  setItem<T = any>(path: string, key: string, data: T): Promise<void> {
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
  updateItem<T = any>(path: string, key: string, data: Partial<T>): Promise<void> {
    const listRef = this.db.list(path);
    return listRef.update(key, data);
  };

  /**
 * Update a record at the specified path.
 * @param path Database path where the data should be updated.
 * @param data The data to update.
 */
  updateData<T = any>(path: string, data: Partial<T>): Promise<void> {
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
  queryList<T = any>(path: string, queryFn: (ref: firebase.database.Reference) => firebase.database.Query): Observable<T[]> {
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
  queryListWithSnapshot<T = any>(path: string, queryFn: (ref: firebase.database.Reference) => firebase.database.Query): Observable<any[]> {
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
  getList<T = any>(path: string): Observable<T[]> {
    return this.db.list<T>(path).valueChanges();
  }

  // Real-time listener for a list with metadata
  getListWithSnapshot<T = any>(path: string): Observable<any[]> {
    return this.db.list<T>(path).snapshotChanges();
  }

  // Real-time listener for a specific object
  getObject<T = any>(path: string): Observable<T | null> {
    return this.db.object<T>(path).valueChanges();
  }

  // Real-time listener for a specific object with metadata
  getObjectWithSnapshot<T = any>(path: string): Observable<any> {
    return this.db.object<T>(path).snapshotChanges();
  }

  // ---------------------- CREATE METHODS ----------------------------

  // Push a new record to a list (with auto-generated ID)
  createWithPush<T = any>(path: string, data: T): Promise<void> {
    return this.db.list(path).push(data).then(() => { });
  }

  // Set or add a new item by key (One-Time Fetch)
  setItem<T = any>(path: string, key: string, data: T): Promise<void> {
    const listRef = this.db.list(path);
    return listRef.set(key, data);
  }

  // Create or update a record (One-Time Fetch)
  createOrUpdate(path: string, data: any): Promise<void> {
    return this.db.object(path).set(data);
  }

  // ---------------------- UPDATE METHODS ----------------------------

  // Update an existing item by key (One-Time Fetch)
  updateItem<T = any>(path: string, key: string, data: Partial<T>): Promise<void> {
    const listRef = this.db.list(path);
    return listRef.update(key, data);
  }

  // Update a record at a path (One-Time Fetch)
  updateData<T = any>(path: string, data: Partial<T>): Promise<void> {
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
  queryList<T = any>(path: string, queryFn: (ref: firebase.database.Reference) => firebase.database.Query): Observable<T[]> {
    return this.db.list<T>(path, queryFn).valueChanges();
  }

  // Query a list with metadata (Real-time listener)
  queryListWithSnapshot<T = any>(path: string, queryFn: (ref: firebase.database.Reference) => firebase.database.Query): Observable<any[]> {
    return this.db.list<T>(path, queryFn).snapshotChanges();
  }
}










/**
 * FirebaseCrudService
 * A service to handle CRUD operations using AngularFire and Firebase Realtime Database.
 * This service includes connection state management and presence tracking.
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudServiceLast {

  constructor(private db: AngularFireDatabase) { }

  /**
   * Create or set data at a specific path.
   * Non-real-time operation: One-time write operation.
   * @param path - The path in the database to set the data.
   * @param data - The data to store at the specified path.
   */
  create(path: string, data: any): Promise<void> {
    return set(ref(this.db.database, path), data);
  }

  /**
   * Read data from a specific path.
   * Non-real-time operation: One-time retrieval. Returns an Observable for automatic updates.
   * @param path - The path to read data from.
   * @returns An Observable of the data at the specified path.
   */
  read(path: string): Observable<any> {
    return this.db.object(path).valueChanges(); // Using AngularFire to get an observable
  }

  /**
   * Update data at a specific path.
   * Non-real-time operation: One-time update of data at a specific path.
   * @param path - The path to update.
   * @param updates - The data to update at the specified path.
   */
  update(path: string, updates: any): Promise<void> {
    return update(ref(this.db.database, path), updates);
  }

  /**
   * Remove data from a specific path.
   * Non-real-time operation: One-time delete operation.
   * @param path - The path of the data to delete.
   */
  remove(path: string): Promise<void> {
    return remove(ref(this.db.database, path));
  }

  /**
   * Push new data to a list at the specified path.
   * Non-real-time operation: Adds a new entry but does not listen for updates.
   * @param path - The path where data is pushed.
   * @param data - The data to push.
   */
  push(path: string, data: any): Promise<any> {
    const newPushRef = push(ref(this.db.database, path));
    return set(newPushRef, data);
  }

  /**
   * Listen for real-time updates at a specific path.
   * Real-time operation: Keeps listening for changes and triggers the callback when data changes.
   * @param path - The path in the database to listen for changes.
   * @param callback - The callback to trigger when data changes.
   */
  listenForUpdates(path: string, callback: (data: any) => void): void {
    const pathRef = ref(this.db.database, path);
    onValue(pathRef, (snapshot) => {
      callback(snapshot.val()); // Trigger callback with updated data
    });
  }

  /**
   * Monitor the connection state of the Firebase client.
   * Real-time operation: Monitors when the client connects or disconnects.
   * @param userId - The user ID to mark as online or offline based on connection state.
   */
  monitorConnection(userId: string): void {
    const connectedRef = ref(this.db.database, '.info/connected');
    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        // Client is connected to Firebase, mark user as online
        const userRef = ref(this.db.database, `users/${userId}/online`);
        set(userRef, true);

        // Set disconnection event to mark user as offline when disconnected
        const lastOnlineRef = ref(this.db.database, `users/${userId}/lastOnline`);
        onDisconnect(userRef).set(false); // User goes offline when disconnected
        onDisconnect(lastOnlineRef).set(serverTimestamp()); // Log the last disconnect timestamp
      } else {
        // Client is not connected
        console.log("Client is not connected to Firebase");
      }
    });
  }

  /**
   * Detect the Firebase client connection state.
   * Real-time operation: Monitors connection state and triggers callback when the state changes.
   * @param path - The path to monitor connection state.
   * @param callback - The callback to execute with connection status (true/false).
   */
  checkConnectionState(path: string, callback: (isConnected: boolean) => void): void {
    const connectedRef = ref(this.db.database, path);
    onValue(connectedRef, (snap) => {
      callback(snap.val() === true); // Trigger callback with updated connection state
    });
  }

  /**
   * Get the server time offset to handle clock skew.
   * Real-time operation: Listens for changes in server time offset.
   * @param callback - The callback to execute with the time offset.
   */
  getServerTimeOffset(callback: (offset: number) => void): void {
    const offsetRef = ref(this.db.database, '.info/serverTimeOffset');
    onValue(offsetRef, (snap) => {
      callback(snap.val()); // Trigger callback with server time offset value
    });
  }

  /**
   * Handle client disconnection.
   * Non-real-time operation: Schedule a one-time action when the client disconnects from the database.
   * @param path - The path to monitor for disconnection events.
   * @param data - The data to store when the client disconnects.
   */
  handleDisconnection(path: string, data: any): void {
    const pathRef = ref(this.db.database, path);
    const onDisconnectRef = onDisconnect(pathRef);
    onDisconnectRef.set(data);
  }
}






























// BEST EVER 

@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudServiceBestEver {

  constructor(private db: AngularFireDatabase) { }

  // ----------------------- READ METHODS ----------------------------

  /**
   * Get data once from a specific path (one-time fetch).
   * @param path The path to fetch data from.
   * @returns A promise containing the data at the specified path.
   */
  getDataOnce<T = any>(path: string): Promise<T> {
    return this.db.database.ref(path).get().then(snapshot => snapshot.val());
  }

  /**
   * Retrieve a list of items from the database (real-time updates).
   * @param path The path to the list in the database.
   * @returns An Observable containing a list of items.
   */
  getList<T = any>(path: string): Observable<T[]> {
    return this.db.list<T>(path).valueChanges();
  }

  /**
   * Retrieve a list of items along with metadata (real-time updates).
   * @param path The path to the list in the database.
   * @returns An Observable containing the list of items with metadata.
   */
  getListWithSnapshot<T = any>(path: string): Observable<any[]> {
    return this.db.list<T>(path).snapshotChanges();
  }

  /**
   * Retrieve a specific object from the database (real-time updates).
   * @param path The path to the object in the database.
   * @returns An Observable containing the object.
   */
  getObject<T = any>(path: string): Observable<T | null> {
    return this.db.object<T>(path).valueChanges();
  }

  /**
   * Retrieve a specific object along with metadata (real-time updates).
   * @param path The path to the object in the database.
   * @returns An Observable containing the object with metadata.
   */
  getObjectWithSnapshot<T = any>(path: string): Observable<any> {
    return this.db.object<T>(path).snapshotChanges();
  }

  /**
   * Query a list with filters, ordering, or limiting (real-time updates).
   * @param path The path to the list.
   * @param queryFn A query function to customize the database reference.
   * @returns An Observable containing the queried list.
   */
  queryList<T = any>(path: string, queryFn: (ref: firebase.database.Reference) => firebase.database.Query): Observable<T[]> {
    return this.db.list<T>(path, queryFn).valueChanges();
  }

  /**
   * Query a list with filters, ordering, or limiting, and metadata (real-time updates).
   * @param path The path to the list.
   * @param queryFn A query function to customize the database reference.
   * @returns An Observable containing the queried list with metadata.
   */
  queryListWithSnapshot<T = any>(path: string, queryFn: (ref: firebase.database.Reference) => firebase.database.Query): Observable<any[]> {
    return this.db.list<T>(path, queryFn).snapshotChanges();
  }

  // ----------------------- CREATE METHODS ----------------------------

  /**
   * Push new data to a list at the specified path (auto-generated ID).
   * @param path The path to push the new data.
   * @param data The data to push.
   * @returns A promise containing the result of the operation.
   */
  createWithPush<T = any>(path: string, data: T): Promise<void> {
    return this.db.list(path).push(data).then(() => { });
  }

  /**
   * Set or add a new item by key.
   * @param path The path where the data will be set.
   * @param key The key for the new item.
   * @param data The data to store.
   * @returns A promise containing the result of the operation.
   */
  setItem<T = any>(path: string, key: string, data: T): Promise<void> {
    return this.db.list(path).set(key, data);
  }

  /**
   * Create or update a record at the specified path.
   * @param path The path to set or update.
   * @param data The data to store.
   * @returns A promise containing the result of the operation.
   */
  createOrUpdate<T = any>(path: string, data: T): Promise<void> {
    return set(ref(this.db.database, path), data);
  }

  // ----------------------- UPDATE METHODS ----------------------------

  /**
   * Update an existing item by key.
   * @param path The path where the data will be updated.
   * @param key The key of the item to update.
   * @param data The data to update.
   * @returns A promise containing the result of the operation.
   */
  updateItem<T = any>(path: string, key: string, data: Partial<T>): Promise<void> {
    return this.db.list(path).update(key, data);
  }

  /**
   * Update a record at a specified path.
   * @param path The path where the data will be updated.
   * @param data The data to update.
   * @returns A promise containing the result of the operation.
   */
  updateData<T = any>(path: string, data: Partial<T>): Promise<void> {
    return update(ref(this.db.database, path), data);
  }

  // ----------------------- DELETE METHODS ----------------------------

  /**
   * Delete an item from a list by key.
   * @param path The path to the list.
   * @param key The key of the item to delete.
   * @returns A promise containing the result of the operation.
   */
  deleteListItem(path: string, key: string): Promise<void> {
    return this.db.list(path).remove(key);
  }

  /**
   * Remove data at a specific path.
   * @param path The path to remove data from.
   * @returns A promise containing the result of the operation.
   */
  deleteData(path: string): Promise<void> {
    return remove(ref(this.db.database, path));
  }

  /**
   * Delete an entire list at a specified path.
   * @param path The path to the list to delete.
   * @returns A promise containing the result of the operation.
   */
  deleteList(path: string): Promise<void> {
    return this.db.list(path).remove();
  }

  // ----------------------- ADDITIONAL METHODS ----------------------

  /**
   * Generate a unique ID for a new item.
   * @returns A unique string ID.
   */
  createUniqueId(): string {
    return this.db.createPushId();
  }

  /**
   * Monitor the connection state of a user.
   * @param userId The user ID to monitor.
   */
  monitorConnection(userId: string): void {
    const connectedRef = ref(this.db.database, '.info/connected');
    onValue(connectedRef, (snap) => {
      if (snap.val()) {
        const userRef = ref(this.db.database, `users/${userId}/online`);
        set(userRef, true);
        const lastOnlineRef = ref(this.db.database, `users/${userId}/lastOnline`);
        onDisconnect(userRef).set(false);
        onDisconnect(lastOnlineRef).set(serverTimestamp());
      }
    });
  }

  /**
   * Handle client disconnection at a specific path.
   * @param path The path to monitor for disconnection events.
   * @param data The data to store when the client disconnects.
   */
  handleDisconnection(path: string, data: any): void {
    const pathRef = ref(this.db.database, path);
    const onDisconnectRef = onDisconnect(pathRef);
    onDisconnectRef.set(data);
  }

  /**
   * Get the server time offset to handle clock skew.
   * @param callback The callback to execute with the time offset.
   */
  getServerTimeOffset(callback: (offset: number) => void): void {
    const offsetRef = ref(this.db.database, '.info/serverTimeOffset');
    onValue(offsetRef, (snap) => {
      callback(snap.val());
    });
  }

  /**
   * Check the connection state of Firebase.
   * @param path The path to monitor for connection state.
   * @param callback The callback to trigger with the connection state.
   */
  checkConnectionState(path: string, callback: (isConnected: boolean) => void): void {
    const connectedRef = ref(this.db.database, path);
    onValue(connectedRef, (snap) => {
      callback(snap.val() === true);
    });
  }
}
