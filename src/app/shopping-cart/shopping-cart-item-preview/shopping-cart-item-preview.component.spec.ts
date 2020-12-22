import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartItemPreviewComponent } from './shopping-cart-item-preview.component';

describe('ShoppingCartItemPreviewComponent', () => {
  let component: ShoppingCartItemPreviewComponent;
  let fixture: ComponentFixture<ShoppingCartItemPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartItemPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartItemPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
