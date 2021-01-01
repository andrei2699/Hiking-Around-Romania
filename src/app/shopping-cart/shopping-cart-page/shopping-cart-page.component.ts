import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from '../shopping-cart-item';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss']
})
export class ShoppingCartPageComponent implements OnInit {

  shoppingCartItems: ShoppingCartItem[] = [];

  constructor(
    public shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.shoppingCartItems = this.shoppingCartService.getShoppingCartItems();
  }

  removeCard(card) {
    this.shoppingCartService.removeItem(card);
  }

  totalOrderPrice() {
    var price = 0;
    for (let i = 0; i < this.shoppingCartItems.length; i++) {
      price = price + this.shoppingCartItems[i].eventTotalPrice * this.shoppingCartItems[i].reservedTickets;
    }
    return price;
  }

  placeOrder() {
    this.shoppingCartService.completeOrder();
    this.shoppingCartItems = this.shoppingCartService.getShoppingCartItems();
  }

}
