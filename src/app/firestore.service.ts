import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, FirestoreError, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { trimStringValues } from './helper.functions';

export interface Friend {
  id: string;
  name: string;
  family: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore = inject(Firestore);

  friendsCollection = collection(this.firestore, 'friends');

  // there is no error in this observable always returns an array, empty or fulfilled
  friends$ = collectionData<Friend>(this.friendsCollection, {
    idField: 'id'
  }) as Observable<Friend[]>;

  addFriend(friend: Omit<Friend, 'id'>) {
    friend = trimStringValues(friend);
    const promise = addDoc(this.friendsCollection, friend)
      .then(response => response.id)
      .catch((error: FirestoreError) => error);
    return from(promise);
  }

  removeFriend(id: string) {
    const docRef = doc(this.firestore, 'friends/' + id);
    const promise = deleteDoc(docRef).catch((error: FirestoreError) => error);
    return from(promise);
  }

  updateFriend(id: string, friend: Omit<Friend, 'id'>) {
    friend = trimStringValues(friend);
    const docRef = doc(this.firestore, 'friends/' + id);
    const promise = setDoc(docRef, friend).catch((error: FirestoreError) => error);
    return from(promise);
  }
}


export type FirestoreErrorCode =
  | 'cancelled'
  | 'unknown'
  | 'invalid-argument'
  | 'deadline-exceeded'
  | 'not-found'
  | 'already-exists'
  | 'permission-denied'
  | 'resource-exhausted'
  | 'failed-precondition'
  | 'aborted'
  | 'out-of-range'
  | 'unimplemented'
  | 'internal'
  | 'unavailable'
  | 'data-loss'
  | 'unauthenticated';