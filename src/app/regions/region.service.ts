import { Injectable } from '@angular/core';
import { Region } from './region';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(
    private _firestore: AngularFirestore
  ) { }

  getAllRegions() {
    return this._firestore.collection('regions').get().pipe(map(collection => collection.docs.map(document => {
      var region = <Region>document.data();
      region.regionId = document.id;
      return region;
    })));
  }

  getAllRegionNames() {
    return this._firestore.collection('regions').get().pipe(map(collection => collection.docs.map(document => {
      return document.data().name;
    })));
  }
}
