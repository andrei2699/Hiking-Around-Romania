import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../authentication.service';
import { EventDetails } from '../events/event-details';
import { EventService } from '../events/event.service';
import { ShoppingCartItem } from './shopping-cart-item'

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private orderedEvents: ShoppingCartItem[] = [{
    eventId: "1444",
    eventMainPhotoUrl: "https://firebasestorage.googleapis.com/v0/b/hiking-around-romania.appspot.com/o/profilePhotos%2FXVeCDu0pEUP43YB95JI2oiQabEp2?alt=media&token=00884b41-31b9-4819-b0a6-ee7bf7002244",
    eventName: "EventName1",
    eventTotalPrice: 40,
    organizerId: "4551515",
    organizerName: "John Doe",
    reservedTickets: 1,
    availableTickets: 15,

  }, {
    eventId: "1444",
    eventMainPhotoUrl: "https://firebasestorage.googleapis.com/v0/b/hiking-around-romania.appspot.com/o/profilePhotos%2FZTRhJ9YdxNbNtDsFKMi259FfMU63?alt=media&token=4106474c-dea9-4908-a59b-4d4a68202377",
    eventName: "EventName1",
    eventTotalPrice: 40,
    organizerId: "4551515",
    organizerName: "John Doe",
    reservedTickets: 3,
    availableTickets: 40
  }
  ];

  constructor(private _firestore: AngularFirestore,
    private eventService: EventService,
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

  addItemToShoppingCart(event: EventDetails, ticketCount: number, totalPrice: number) {
    const shoppingCartItem: ShoppingCartItem = {
      eventId: event.eventId,
      eventMainPhotoUrl: event.eventMainPhotoUrl,
      eventName: event.eventName,
      eventTotalPrice: totalPrice,
      organizerId: event.organizerId,
      organizerName: event.organizerName,
      reservedTickets: ticketCount,
      availableTickets: this.eventService.getAvailableTickets(event)
    }

    this.orderedEvents.push(shoppingCartItem);
    // this._authenticationService.getCurrentUserId().subscribe(userid => {
    //   if (userid) {
    //     this._firestore.doc(`orders/${userid}`).set(this.orderedEvents);
    //   }
    // })
  }

  removeItem(shoppingCartItem: ShoppingCartItem) {
    this.orderedEvents.splice(this.orderedEvents.indexOf(shoppingCartItem), 1);
  }

  completeOrder() {
    this.orderedEvents = [];
    console.log('Order Sent');
  }
}
