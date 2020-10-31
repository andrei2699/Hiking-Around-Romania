import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { EventOrganizerProfile } from './event-organizer-profile/event-organizer-profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage) { }

  getProfile(userId) {
    return this.firestore.doc(`/profiles/${userId}`).get();
  }

  getPhoto(organizerProfile, otherInfo?: number | string) {
    let fileName = organizerProfile.userId;
    if (otherInfo) {
      fileName += "_" + otherInfo;
    }
    return this.firestorage.ref(`profilePhotos/${fileName}`).getDownloadURL();
  }

  uploadPhoto(organizerProfile: EventOrganizerProfile, file, otherInfo?: number | string) {
    let fileName = organizerProfile.userId;
    if (otherInfo) {
      fileName += "_" + otherInfo;
    }
    return this.firestorage.upload(`profilePhotos/${fileName}`, file);
  }

  saveProfile(organizerProfile: EventOrganizerProfile) {
    return this.firestore.doc(`profiles/${organizerProfile.userId}`).set({
      profilePhotoUrl: organizerProfile.profilePhotoUrl,
      description: organizerProfile.description,
      otherPhotosUrl: organizerProfile.otherPhotosUrl
    }, { merge: true });
  }
}
