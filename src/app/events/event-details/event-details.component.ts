import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EventDetails } from '../event-details';
import { EventService } from '../event.service';
import { UNAVAILABLE_IMG_URL } from '../../unavailable_img_url'
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  eventDetails: EventDetails;
  unavailablePhotoUrl = UNAVAILABLE_IMG_URL;
  showAddToCartButton = true;
  isCurrentUser = false;

  constructor(public translate: TranslateService,
    private _eventService: EventService,
    private _authService: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const eventId = params.get('eventId');

      this._authService.isCurrentUserRegularUser().subscribe(isRegular => {
        this.showAddToCartButton = isRegular;
      }, err => {
        console.log(err);
      });

      this._eventService.getEvent(eventId)
        .subscribe(res => {
          const data = res.data();
          if (data) {
            this.eventDetails = <EventDetails>data;
            this.eventDetails.eventId = eventId;
            var userId = this.eventDetails.organizerId;
            this._authService.checkIfIdBelongsToLoggedUser(userId)
              .subscribe(r => {
                console.log(r)
                this.isCurrentUser = r;
              });
          } else {
            this.eventDetails = undefined;
          }
        }, err => {
          console.log(err);
        });
    });
  }

  calculateTotalPrice() {
    return this.eventDetails.eventPrice + this.eventDetails.accomodationPrice + this.eventDetails.transportPrice;
  }

  updateEvent() {
    this._router.navigate(['update-event', this.eventDetails.eventId])
  }
}
