import { Component, OnInit } from '@angular/core';
import { EventService } from '../events/event.service';
import { TranslateService } from '@ngx-translate/core';
import { RegionService } from '../regions/region.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalPrice: number;
  searchText: string;
  events = [];
  regions = [];
  searchTextRegions: string;

  constructor(
    public eventService: EventService,
    private _regionService: RegionService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.eventService.getAllEvents()
      .subscribe(res => {
        this.events = res;
      })

    this._regionService.getAllRegions()
      .subscribe(res => {
        this.regions = res;
      })
  }
}
