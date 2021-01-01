import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventService } from 'src/app/events/event.service';
import { PricesCalculatorService } from 'src/app/events/prices-calculator.service';

@Component({
  selector: 'app-event-array',
  templateUrl: './event-array.component.html',
  styleUrls: ['./event-array.component.scss']
})
export class EventArrayComponent implements OnInit {

  @Input() events;
  @Input() filter: string = '';
  @Input() lighterColors: boolean = false;

  constructor(public translate: TranslateService,
    public eventService: EventService,
    public pricesCalculatorService: PricesCalculatorService) { }

  ngOnInit(): void {
  }

}
