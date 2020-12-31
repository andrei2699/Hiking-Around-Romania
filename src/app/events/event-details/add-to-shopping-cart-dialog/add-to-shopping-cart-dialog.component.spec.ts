import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToShoppingCartDialogComponent } from './add-to-shopping-cart-dialog.component';

describe('AddToShoppingCartDialogComponent', () => {
  let component: AddToShoppingCartDialogComponent;
  let fixture: ComponentFixture<AddToShoppingCartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToShoppingCartDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToShoppingCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
