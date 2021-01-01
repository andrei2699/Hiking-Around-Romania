import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ReplaySubject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { EventDetails } from '../events/event-details';
import { EventService } from '../events/event.service';
import { ShoppingCartItem } from './shopping-cart-item'

@Injectable({
	providedIn: 'root'
})
export class ShoppingCartService {

	cartItemsSubject = new ReplaySubject(1);

	constructor(private _firestore: AngularFirestore,
		private eventService: EventService,
		private _authenticationService: AuthenticationService) { }

	getShoppingCartItems() {

		this._authenticationService.getCurrentUserId().subscribe(id => {
			if (id) {
				this._firestore.doc(`orders/${id}`).get().subscribe(res => {
					if (res.data()) {
						this.cartItemsSubject.next(res.data().events);
					} else {
						this.cartItemsSubject.next([]);
					}
				})
			} else {
				this.cartItemsSubject.next([]);
			}
		})
		return this.cartItemsSubject;
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

		this._authenticationService.getCurrentUserId().subscribe(userid => {
			if (userid) {
				this._firestore.doc(`orders/${userid}`).get().subscribe(o => {
					var order = o.data();
					var found = false;
					if (!order) {
						order = {};
					}
					if (order.events) {
						for (let i = 0; i < order.events.length; i++) {
							if (shoppingCartItem.eventId === order.events[i].eventId) {
								order.events[i].reservedTickets += shoppingCartItem.reservedTickets;
								found = true;
								break;
							}
						}
						if (!found) {
							order.events.push(shoppingCartItem);
						}
					} else {
						order.events = [];
						order.events.push(shoppingCartItem);
					}

					this._firestore.doc(`orders/${userid}`).set(order).then();
					this.cartItemsSubject.next(order.events);
				});
			}
		})
	}

	removeItem(shoppingCartItem: ShoppingCartItem) {
		this._authenticationService.getCurrentUserId().subscribe(userid => {
			if (userid) {
				this._firestore.doc(`orders/${userid}`).get().subscribe(o => {
					var order = o.data();
					var found = false;
					if (order && order.events) {
						for (let i = 0; i < order.events.length; i++) {
							if (shoppingCartItem.eventId === order.events[i].eventId) {
								order.events.splice(i, 1);
								found = true;
								break;
							}
						}
						if (found) {
							this._firestore.doc(`orders/${userid}`).set(order).then(() => {

								this.cartItemsSubject.next(order.events);

							});
						}
					}
				});
			}
		})
	}

	completeOrder() {
		this._authenticationService.getCurrentUserId().subscribe(userid => {
			if (userid) {
				this._firestore.doc(`orders/${userid}`).get().subscribe(o => {
					var order = o.data();
					if (order && order.events) {
						for (let i = 0; i < order.events.length; i++) {
							this.eventService.updateEventReservedTickets(order.events[i].eventId, order.events[i].reservedTickets).subscribe();
						}

						this._firestore.doc(`completedOrders/${userid}`).get().subscribe(d => {
							var data = d.data();
							if (!data) {
								data = { orders: [] };
							}

							data.orders.push(order);

							this._firestore.doc(`completedOrders/${userid}`).set(data).then(() => {
								this._firestore.doc(`orders/${userid}`).delete();
								this.cartItemsSubject.next([]);
							});
						});
					}
				});
			}
		})
	}
}
