import { Pipe, PipeTransform } from '@angular/core';
import { Region } from '../regions/region';

@Pipe({
  name: 'regionFilter'
})
export class RegionFilterPipe implements PipeTransform {

  transform(regions: Region[], searchText: string): Region[] {
    if (!regions)
      return [];
    if (!searchText)
      return regions;

    return regions.filter(region => {
      return region.name.toLowerCase().includes(searchText.toLowerCase());
    })
  }

}
