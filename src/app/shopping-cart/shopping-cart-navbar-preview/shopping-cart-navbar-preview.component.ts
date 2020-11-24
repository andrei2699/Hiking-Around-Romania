import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-navbar-preview',
  templateUrl: './shopping-cart-navbar-preview.component.html',
  styleUrls: ['./shopping-cart-navbar-preview.component.scss']
})
export class ShoppingCartNavbarPreviewComponent implements OnInit {

  constructor(public shoppingCartService: ShoppingCartService,
    public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
