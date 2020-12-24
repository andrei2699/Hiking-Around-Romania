import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EventDetails } from '../event-details';
import { EventService } from '../event.service';
import { UNAVAILABLE_IMG_URL } from '../../unavailable_img_url';
import { AuthenticationService } from 'src/app/authentication.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ElementRef } from '@angular/core';
import { ENGINE_METHOD_STORE } from 'constants';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  createEventForm: FormGroup;
  eventDetails: EventDetails;
  isLinear = false;
  markerCenter: google.maps.LatLngLiteral;
  mapClicked = false;

  constructor(
    private _eventService:EventService,
    private _authService: AuthenticationService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    public translate: TranslateService,
    private _snackBar: MatSnackBar
    ) { }

  @ViewChild('eventPhotoFileInput') eventPhotoFileInput: ElementRef;

  unavailableImageUrl = UNAVAILABLE_IMG_URL;

  ngOnInit(): void {
    this.createEventForm = this._formBuilder.group({
      eventName: ['', [Validators.required]],
      eventPrice: [''],
      eventMainPhotoUrl: [''],
      description: [''],
      transport: ['', Validators.required],
      transportPrice: ['', [Validators.required]],
      accomodation: ['', Validators.required],
      accomodationPrice: ['', [Validators.required]]
    });
    this.eventDetails = new EventDetails();
    this.eventDetails.mapLat = 0;
    this.eventDetails.mapLng = 0;
  }

  onSubmit() { 
    this.eventDetails.mapLat = this.markerCenter.lat;
    this.eventDetails.mapLng = this.markerCenter.lng;
    this._eventService.updateEvent(this.eventDetails).then(
      //fac redirectarea
    );
   }

  openEventPhotoDialog() {
    this.eventPhotoFileInput.nativeElement.click();
  }

  uploadPhoto(files) {
    this._authService.getCurrentUserId().subscribe(id => {
      this.eventDetails.organizerId = id;
      this.eventDetails.organizerName = this._authService.userDisplayName;
      this.eventDetails.eventPhotosUrl = [];
      this.eventDetails.eventMainPhotoUrl = "";
      this._eventService.createEvent(this.eventDetails).then(x => {
        this.eventDetails = <EventDetails> x.data();
        this.eventDetails.eventId = x.id;
        this._eventService.uploadPhoto(this.eventDetails, files[0])
      .then(() => {
        this._eventService.getPhoto(this.eventDetails)
          .subscribe(res => {
            this.eventDetails.eventMainPhotoUrl = res;
          })
      });
      })
    });
  }

  selectLocation(event) {
    this.mapClicked = true;
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    this.markerCenter = {lat: lat, lng: lng};
  }
}


