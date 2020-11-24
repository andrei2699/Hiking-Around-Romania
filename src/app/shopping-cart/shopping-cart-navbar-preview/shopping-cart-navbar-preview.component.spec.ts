import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartNavbarPreviewComponent } from './shopping-cart-navbar-preview.component';

describe('ShoppingCartNavbarPreviewComponent', () => {
  let component: ShoppingCartNavbarPreviewComponent;
  let fixture: ComponentFixture<ShoppingCartNavbarPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartNavbarPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartNavbarPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
