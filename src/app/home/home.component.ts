import { Component, OnInit } from '@angular/core';
import { EventDetails } from '../events/event-details';
import { EventService } from '../events/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalPrice: number;
  searchText: string;
  events = [];

  constructor(
    private _eventService: EventService,
  ) { }

  ngOnInit(): void {
    this._eventService.getAllEvents()
      .subscribe(res => {
        this.events = res;
      })
  }
}
