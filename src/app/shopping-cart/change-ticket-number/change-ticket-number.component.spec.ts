import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTicketNumberComponent } from './change-ticket-number.component';

describe('ChangeTicketNumberComponent', () => {
  let component: ChangeTicketNumberComponent;
  let fixture: ComponentFixture<ChangeTicketNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeTicketNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTicketNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
