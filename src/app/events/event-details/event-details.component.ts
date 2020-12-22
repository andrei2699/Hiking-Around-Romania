import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EventDetails } from '../event-details';
import { EventService } from '../event.service';
import { UNAVAILABLE_IMG_URL } from '../../unavailable_img_url'
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  eventDetails: EventDetails;
  unavailablePhotoUrl = UNAVAILABLE_IMG_URL;
  showAddToCartButton = true;

  constructor(public translate: TranslateService,
    private _eventService: EventService,
    private _authService: AuthenticationService,
    private _route: ActivatedRoute) { }

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
            this.eventDetails = {
              eventId: eventId,
              eventName: data.eventName,
              eventPrice: data.eventPrice ? data.eventPrice : 0,
              eventMainPhotoUrl: data.eventMainPhotoUrl ? data.eventMainPhotoUrl : this.unavailablePhotoUrl,
              eventDescription: data.description ? data.description : "",
              organizerName: data.organizerName,
              organizerId: data.organizerId,
              mapCenter: { lat: data.mapLat, lng: data.mapLng },
              accomodation: data.accomodation ? data.accomodation : "",
              accomodationPrice: data.accomodationPrice ? data.accomodationPrice : 0,
              transportPrice: data.transportPrice ? data.transportPrice : 0,
              transport: data.transport ? data.transport : "",
              eventPhotosUrl: data.eventPhotosUrl ? data.eventPhotosUrl : []
            };
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
}
