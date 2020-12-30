import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ImagesFirestorageService } from '../images-firestorage.service';
import { EventOrganizerProfile } from './event-organizer-profile/event-organizer-profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private _firestore: AngularFirestore,
    private _firestorageImageService: ImagesFirestorageService) { }

  getProfile(userId) {
    return this._firestore.doc(`/profiles/${userId}`).get();
  }

  getAllProfiles() {
    return this._firestore.collection('profiles').get().pipe(map(collection => collection.docs.map(document => {
      var profile = <EventOrganizerProfile>document.data();
      profile.userId = document.id;
      return profile;
    })));
  }

  getAllOrganizerProfiles() {

    return this._firestore.collection('profiles').get().pipe(map(collection => collection.docs
      .filter(doc => doc.data().userType == 'event_organizer').map(x => {
        var profile = <EventOrganizerProfile>x.data();
        profile.userId = x.id;
        return profile;
      })));
  }

  getPhoto(organizerProfile, nameVariation?: number | string) {
    return this._firestorageImageService
      .getPhotoWithNameVariation('profilePhotos', organizerProfile.userId, nameVariation);
  }

  uploadPhoto(organizerProfile: EventOrganizerProfile, file, nameVariation?: number | string) {
    return this._firestorageImageService
      .uploadPhotoWithNameVariation('profilePhotos', organizerProfile.userId, file, nameVariation);
  }

  saveProfile(organizerProfile: EventOrganizerProfile) {
    return this._firestore.doc(`profiles/${organizerProfile.userId}`).set({
      profilePhotoUrl: organizerProfile.profilePhotoUrl,
      description: organizerProfile.description,
      otherPhotosUrl: organizerProfile.otherPhotosUrl
    }, { merge: true });
  }
}
