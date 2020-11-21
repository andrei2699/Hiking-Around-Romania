import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ImagesFirestorageService } from '../images-firestorage.service';
import { EventDetails } from './event-organizer-profile';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _firestore: AngularFirestore,
    private _firestorageImageService: ImagesFirestorageService) { }

  getEvent(eventId) {
    return this._firestore.doc(`events/${eventId}`).get();
  }

  getPhoto(eventDetails: EventDetails, nameVariation?: number | string) {
    return this._firestorageImageService
      .getPhotoWithNameVariation('eventPhotos', eventDetails.eventId, nameVariation);
  }

  uploadPhoto(organizerProfile: EventDetails, file, nameVariation?: number | string) {
    return this._firestorageImageService
      .uploadPhotoWithNameVariation('eventPhotos', organizerProfile.eventId, file, nameVariation);
  }

  createEvent(eventDetails: EventDetails) {
    const uploadData = {
      accomodation: eventDetails.accomodation,
      accomodationPrice: eventDetails.accomodationPrice,
      description: eventDetails.eventDescription,
      eventName: eventDetails.eventName,
      eventMainPhotoUrl: eventDetails.eventMainPhotoUrl,

      eventPhotosUrl: eventDetails.eventPhotosUrl,

      eventPrice: eventDetails.eventPrice,
      mapLat: eventDetails.mapCenter.lat,
      mapLng: eventDetails.mapCenter.lng,

      organizerId: eventDetails.organizerId,
      organizerName: eventDetails.organizerName,

      transport: eventDetails.transport,
      transportPrice: eventDetails.transportPrice,
    };

    if (eventDetails.eventId) {
      return this._firestore.doc(`events/${eventDetails.eventId}`).set(uploadData);
    }

    return this._firestore.collection('events').add(uploadData);
  }
}
