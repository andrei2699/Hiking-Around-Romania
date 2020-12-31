import { Injectable } from '@angular/core';
import { EventDetails } from './event-details';

@Injectable({
  providedIn: 'root'
})
export class PricesCalculatorService {

  constructor() { }

  getTotalPriceEvent(eventDetails: EventDetails) {
    return eventDetails.accomodationPrice + eventDetails.transportPrice + eventDetails.eventPrice;
  }

}
