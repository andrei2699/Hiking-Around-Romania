import { Pipe, PipeTransform } from '@angular/core';
import { EventOrganizerProfile } from '../profile/event-organizer-profile/event-organizer-profile';

@Pipe({
  name: 'organizerFilter'
})
export class OrganizerFilterPipe implements PipeTransform {

  transform(organizers: EventOrganizerProfile[], searchText: string): EventOrganizerProfile[] {
    if (!organizers)
      return [];
    if (!searchText)
      return organizers;

    return organizers.filter(organizer => {
      return organizer.name.toLowerCase().includes(searchText.toLowerCase());
    })
  }

}
