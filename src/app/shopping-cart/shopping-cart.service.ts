import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../authentication.service';
import { EventDetails } from '../events/event-details';
import { ShoppingCartItem } from './shopping-cart-item'

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private orderedEvents: ShoppingCartItem[] = [
    {
      eventId: "1444",
      eventMainPhotoUrl: "https://firebasestorage.googleapis.com/v0/b/hiking-around-romania.appspot.com/o/profilePhotos%2FZTRhJ9YdxNbNtDsFKMi259FfMU63_2?alt=media&token=480a84a5-ceaa-43d2-841f-90e5c1ed6a3a",
      eventName: "EventName1",
      eventTotalPrice: 40,
      organizerId: "4551515",
      organizerName: "John Doe"
    },
    {
      eventId: "1444",
      eventMainPhotoUrl: "https://firebasestorage.googleapis.com/v0/b/hiking-around-romania.appspot.com/o/profilePhotos%2FZTRhJ9YdxNbNtDsFKMi259FfMU63_2?alt=media&token=480a84a5-ceaa-43d2-841f-90e5c1ed6a3a",
      eventName: "EventName1",
      eventTotalPrice: 40,
      organizerId: "4551515",
      organizerName: "John Doe"
    },
    {
      eventId: "1444",
      eventMainPhotoUrl: "https://firebasestorage.googleapis.com/v0/b/hiking-around-romania.appspot.com/o/profilePhotos%2FZTRhJ9YdxNbNtDsFKMi259FfMU63_2?alt=media&token=480a84a5-ceaa-43d2-841f-90e5c1ed6a3a",
      eventName: "EventName1",
      eventTotalPrice: 40,
      organizerId: "4551515",
      organizerName: "John Doe"
    },
    {
      eventId: "1444",
      eventMainPhotoUrl: "https://firebasestorage.googleapis.com/v0/b/hiking-around-romania.appspot.com/o/profilePhotos%2FZTRhJ9YdxNbNtDsFKMi259FfMU63?alt=media&token=a939f914-f479-4f50-b5dd-8f3aa204e03c",
      eventName: "EventName1",
      eventTotalPrice: 40,
      organizerId: "4551515",
      organizerName: "John Doe"
    },
  ];

  constructor(private _firestore: AngularFirestore,
    private _authenticationService: AuthenticationService) { }

  getShoppingCartItemCount() {
    return this.orderedEvents.length;
  }

  getShoppingCartItems() {
    return this.orderedEvents;
  }

  hasItems() {
    return this.orderedEvents.length > 0;
  }

  addItemToShoppingCart(event: EventDetails) {
    const shoppingCartItem: ShoppingCartItem = {
      eventId: event.eventId,
      eventMainPhotoUrl: event.eventMainPhotoUrl,
      eventName: event.eventName,
      eventTotalPrice: event.eventPrice + event.transportPrice + event.accomodationPrice,
      organizerId: event.organizerId,
      organizerName: event.organizerName
    }

    this.orderedEvents.push(shoppingCartItem);
    this._authenticationService.getCurrentUserId().subscribe(userid => {
      if (userid) {
        this._firestore.doc(`orders/${userid}`).set(this.orderedEvents);
      }
    })
  }

  completeOrder() {
    this.orderedEvents = [];
    console.log('Order Sent');
  }
}
