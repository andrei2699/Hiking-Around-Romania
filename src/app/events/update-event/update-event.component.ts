import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EventDetails } from '../event-details';
import { EventService } from '../event.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {

  givenEventDetails: EventDetails;
  isUndefined = false;
  updateTitle = 'UPDATE_EVENT.UPDATE_EVENT_FORM';
  updateButton = 'BUTTONS.UPDATE';

  constructor(
    private _eventService: EventService,
    private _route: ActivatedRoute,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const eventId = params.get('eventId');
      this._eventService.getEvent(eventId).subscribe(x => {
        var xdata = x.data();
        if (xdata) {
          this.givenEventDetails = <EventDetails>xdata;
          this.givenEventDetails.eventId = eventId;
          if (xdata.startDate) {
            this.givenEventDetails.startDate = xdata.startDate.toDate();
          }
          if (xdata.endDate) {
            this.givenEventDetails.endDate = xdata.endDate.toDate();
          }
        }
        else {
          this.isUndefined = true;
        }
      });
    });
  }

}
