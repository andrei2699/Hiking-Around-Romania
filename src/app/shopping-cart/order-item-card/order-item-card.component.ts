import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingCartItem } from '../shopping-cart-item';

@Component({
  selector: 'app-order-item-card',
  templateUrl: './order-item-card.component.html',
  styleUrls: ['./order-item-card.component.scss']
})
export class OrderItemCardComponent implements OnInit {

  @Input() item: ShoppingCartItem;

  @Output() deleteEvent = new EventEmitter<ShoppingCartItem>();

  constructor() { }

  ngOnInit(): void {
  }

  reservationTotalPrice(): number {
    return this.item.eventTotalPrice * this.item.reservedTickets;
  }

  deleteCard() {
    this.deleteEvent.emit(this.item);
  }

}
