import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrganizerProfileComponent } from './event-organizer-profile.component';

describe('EventOrganizerProfileComponent', () => {
  let component: EventOrganizerProfileComponent;
  let fixture: ComponentFixture<EventOrganizerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventOrganizerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventOrganizerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
