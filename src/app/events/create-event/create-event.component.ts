import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventDetails } from '../event-details';
import { EventService } from '../event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  newEventDetails: EventDetails;
  createTitle = 'CREATE_EVENT.CREATE_EVENT_FORM';
  createButton = 'BUTTONS.CREATE';

  constructor(
    public translate: TranslateService,
    private _eventService: EventService
  ) { }

  ngOnInit(): void {
    this.newEventDetails = new EventDetails();

    this.newEventDetails.mapLat = this._eventService.defaultLatitude;
    this.newEventDetails.mapLng = this._eventService.defaultLongitude;
  }
}


