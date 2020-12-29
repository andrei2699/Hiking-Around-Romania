import { Pipe, PipeTransform } from '@angular/core';
import { EventDetails } from '../events/event-details';

@Pipe({
	name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {

	transform(events: EventDetails[], searchText: string): EventDetails[] {
		if (!events)
			return [];
		if (!searchText)
			return events;

		return events.filter(event => {
			return event.eventName.toLowerCase().includes(searchText.toLowerCase()) || (event.region && event.region.toLowerCase().includes(searchText.toLowerCase()));
		})
	}
}
