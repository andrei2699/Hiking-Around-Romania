import { Component, OnInit } from '@angular/core';
import { EventService } from '../events/event.service';
import { TranslateService } from '@ngx-translate/core';

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
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this._eventService.getAllEvents()
      .subscribe(res => {
        this.events = res;
      })
  }
}
