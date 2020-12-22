import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UNAVAILABLE_IMG_URL } from 'src/app/unavailable_img_url';
import { ShoppingCartItem } from '../shopping-cart-item';

@Component({
  selector: 'app-shopping-cart-item-preview',
  templateUrl: './shopping-cart-item-preview.component.html',
  styleUrls: ['./shopping-cart-item-preview.component.scss']
})
export class ShoppingCartItemPreviewComponent implements OnInit {

  @Input() shoppingCartItem: ShoppingCartItem;


  unavailableImageUrl = UNAVAILABLE_IMG_URL;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
