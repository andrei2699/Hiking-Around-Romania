import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { user } from 'firebase-functions/lib/providers/auth';
import { filter, map } from 'rxjs/operators';
import { ImagesFirestorageService } from '../images-firestorage.service';
import { EventDetails } from './event-details';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  defaultLatitude = 45.7571357;
  defaultLongitude = 21.2286974;

  constructor(private _firestore: AngularFirestore,
    private firebaseFunctions: AngularFireFunctions,
    private _firestorageImageService: ImagesFirestorageService) { }

  getEvent(eventId) {
    return this._firestore.doc(`events/${eventId}`).get().pipe(map(doc => {
      var data = doc.data();
      if (data) {
        var eventDetails = <EventDetails>data;
        eventDetails.eventId = eventId;
        if (data.startDate) {
          eventDetails.startDate = data.startDate.toDate();
        }
        if (data.endDate) {
          eventDetails.endDate = data.endDate.toDate();
        }

        return eventDetails;
      }

      return undefined;
    }));
  }

  getAllEvents() {
    return this._firestore.collection('events').get().pipe(map(collection => collection.docs.map(document => {
      var eventDetails = <EventDetails>document.data();
      eventDetails.eventId = document.id;
      if (document.data().startDate) {
        eventDetails.startDate = document.data().startDate.toDate();
      }
      if (document.data().endDate) {
        eventDetails.endDate = document.data().endDate.toDate();
      }
      return eventDetails;
    })));
  }

  getFutureEvents() {
    return this.firebaseFunctions.httpsCallable('getFutureEvents')({}).pipe(map(d => {
      return <EventDetails[]>d;
    }));
  }

  getFutureEventsBelongingToOrganizer(organizerId) {
    return this.getFutureEvents().pipe(map(events => {
      return events.filter(event => event.organizerId == organizerId)
    }));
  }

  getPastEventsBelongingToOrganizer(organizerId) {
    return this.firebaseFunctions.httpsCallable('getPastEventsOfOrganizer')({ organizerId: organizerId })
      .pipe(map(events => {
        return <EventDetails[]>events;
      }))
    // return this.getFutureEvents().pipe(map(events =>
    //   events.filter(event => event.organizerId == organizerId)));
  }

  getAvailableTickets(eventDetails) {
    return eventDetails.totalTickets - eventDetails.reservedTickets;
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
      reservedTickets: 0,

      startDate: eventDetails.startDate,
      endDate: eventDetails.endDate,

      region: eventDetails.region

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
        reservedTickets: eventDetails.reservedTickets,

        startDate: eventDetails.startDate,
        endDate: eventDetails.endDate,

        region: eventDetails.region

      });
    }
  }

  updateEventReservedTickets(eventId, reservedTickets) {
    return this._firestore.doc(`events/${eventId}`).get().pipe(map(document => {
      var eventDetails = <EventDetails>document.data();
      eventDetails.eventId = document.id;
      eventDetails.reservedTickets += reservedTickets;
      this.updateEvent(eventDetails).then();
    }));

  }
}
