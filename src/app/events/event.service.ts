import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ImagesFirestorageService } from '../images-firestorage.service';
import { EventDetails } from './event-details';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  defaultLatitude = 45.7571357;
  defaultLongitude = 21.2286974;

  constructor(private _firestore: AngularFirestore,
    private _firestorageImageService: ImagesFirestorageService) { }

  getEvent(eventId) {
    return this._firestore.doc(`events/${eventId}`).get();
  }

  getPhoto(eventDetails: EventDetails, nameVariation?: number | string) {
    return this._firestorageImageService
      .getPhotoWithNameVariation('eventPhotos', eventDetails.eventId, nameVariation);
  }

  uploadPhoto(eventDetails: EventDetails, file, nameVariation?: number | string) {
    return this._firestorageImageService
      .uploadPhotoWithNameVariation('eventPhotos', eventDetails.eventId, file, nameVariation);
  }

  formatDate(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  }

  createEvent(eventDetails: EventDetails) {
    return this._firestore.collection('events').add({
      accomodation: eventDetails.accomodation,
      accomodationPrice: eventDetails.accomodationPrice,
      eventDescription: eventDetails.eventDescription,
      eventName: eventDetails.eventName,
      eventMainPhotoUrl: eventDetails.eventMainPhotoUrl,

      eventPhotosUrl: eventDetails.eventPhotosUrl,

      eventPrice: eventDetails.eventPrice,

      mapLat: this.defaultLatitude,
      mapLng: this.defaultLongitude,

      organizerId: eventDetails.organizerId,
      organizerName: eventDetails.organizerName,

      transport: eventDetails.transport,
      transportPrice: eventDetails.transportPrice,

      dateOfCreation: this.formatDate(new Date()),

      totalTickets: eventDetails.totalTickets,
      reservedTickets: 0

    }).then(res => res.get());
  }

  updateEvent(eventDetails: EventDetails) {
    if (eventDetails.eventId) {

      return this._firestore.doc(`events/${eventDetails.eventId}`).set({
        accomodation: eventDetails.accomodation,
        accomodationPrice: eventDetails.accomodationPrice,
        eventDescription: eventDetails.eventDescription,
        eventName: eventDetails.eventName,
        eventMainPhotoUrl: eventDetails.eventMainPhotoUrl,

        eventPhotosUrl: eventDetails.eventPhotosUrl,

        eventPrice: eventDetails.eventPrice,

        mapLat: eventDetails.mapLat,
        mapLng: eventDetails.mapLng,

        organizerId: eventDetails.organizerId,
        organizerName: eventDetails.organizerName,

        transport: eventDetails.transport,
        transportPrice: eventDetails.transportPrice,

        dateOfCreation: eventDetails.dateOfCreation,

        totalTickets: eventDetails.totalTickets,
        reservedTickets: eventDetails.reservedTickets

      });
    }
  }
}
