import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventArrayComponent } from './event-array.component';

describe('EventArrayComponent', () => {
  let component: EventArrayComponent;
  let fixture: ComponentFixture<EventArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
