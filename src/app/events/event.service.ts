import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _firestore: AngularFirestore,
    private _firestorage: AngularFireStorage) { }

  getEvent(eventId) {
    return this._firestore.doc(`events/${eventId}`).get();
  }
}
