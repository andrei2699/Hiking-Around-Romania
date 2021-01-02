import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EventDetails } from '../event-details';
import { EventService } from '../event.service';
import { UNAVAILABLE_IMG_URL } from '../../unavailable_img_url';
import { AuthenticationService } from 'src/app/authentication.service';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { RegionService } from 'src/app/regions/region.service';

@Component({
	selector: 'app-create-update-event',
	templateUrl: './create-update-event.component.html',
	styleUrls: ['./create-update-event.component.scss']
})

export class CreateUpdateEventComponent implements OnInit {

	@Input()
	get eventDetails(): EventDetails { return this._eventDetails; }
	set eventDetails(eventDetails: EventDetails) {
		this._eventDetails = eventDetails;
		if (eventDetails) {
			this.markerCenter = { lat: this.eventDetails.mapLat, lng: this.eventDetails.mapLng };
			this.mapClicked = true;
		}
	}
	private _eventDetails;

	@Input() formTitle;
	@Input() finishButton;
	isLinear = false;
	createEventForm: FormGroup;
	markerCenter: google.maps.LatLngLiteral;
	mapClicked = false;
	regionNames = [];
	waitingForImage = false;

	constructor(
		private _eventService: EventService,
		private _authService: AuthenticationService,
		private _regionService: RegionService,
		private _router: Router,
		private _formBuilder: FormBuilder,
		public translate: TranslateService,
	) { }

	@ViewChild('eventPhotoFileInput') eventPhotoFileInput: ElementRef;

	unavailableImageUrl = UNAVAILABLE_IMG_URL;

	ngOnInit(): void {

		this._regionService.getAllRegionNames().subscribe(reg => {
			this.regionNames = reg;
		});

		this.createEventForm = this._formBuilder.group({
			eventName: ['', [Validators.required]],
			eventPrice: ['', [Validators.required]],
			eventMainPhotoUrl: [''],
			description: [''],
			transport: ['', Validators.required],
			transportPrice: ['', [Validators.required]],
			accomodation: ['', Validators.required],
			accomodationPrice: ['', [Validators.required]],
			totalTickets: ['', [Validators.required]],
			region: ['', [Validators.required]],
			startDate: ['', [Validators.required]],
			endDate: ['', [Validators.required]]
		});
	}

	onSubmit() {
		if (this.eventDetails.eventId) {
			this.eventDetails.mapLat = this.markerCenter.lat;
			this.eventDetails.mapLng = this.markerCenter.lng;
			this._eventService.updateEvent(this.eventDetails).then(() =>
				this._router.navigate(['event-details', this.eventDetails.eventId])
			);
		}
		else {
			this._authService.getCurrentUserId().subscribe(id => {
				this.eventDetails.organizerId = id;
				this.eventDetails.organizerName = this._authService.userDisplayName;
				this.eventDetails.eventPhotosUrl = [];
				this.eventDetails.eventMainPhotoUrl = "";
				this._eventService.createEvent(this.eventDetails).then(x => {
					var latitude = this.markerCenter.lat;
					var longitude = this.markerCenter.lng;
					this.eventDetails = <EventDetails>x.data();
					this.eventDetails.eventId = x.id;
					this.eventDetails.mapLat = latitude;
					this.eventDetails.mapLng = longitude;
					this._eventService.updateEvent(this.eventDetails).then(() =>
						this._router.navigate(['event-details', this.eventDetails.eventId])
					);
				})
			});
		}
	}

	openEventPhotoDialog() {
		this.eventPhotoFileInput.nativeElement.click();
	}

	uploadPhoto(files) {
		this.waitingForImage = true;

		if (this.eventDetails.eventId) {
			this._eventService.uploadPhoto(this.eventDetails, files[0])
				.then(() => {
					this._eventService.getPhoto(this.eventDetails)
						.subscribe(res => {
							this.eventDetails.eventMainPhotoUrl = res;
							this.waitingForImage = false;
						})
				});
		}
		else {
			this._authService.getCurrentUserId().subscribe(id => {
				this.eventDetails.organizerId = id;
				this.eventDetails.organizerName = this._authService.userDisplayName;
				this.eventDetails.eventPhotosUrl = [];
				this.eventDetails.eventMainPhotoUrl = "";
				this._eventService.createEvent(this.eventDetails).then(x => {
					this.eventDetails = <EventDetails>x.data();
					this.eventDetails.eventId = x.id;
					this._eventService.uploadPhoto(this.eventDetails, files[0])
						.then(() => {
							this._eventService.getPhoto(this.eventDetails)
								.subscribe(res => {
									this.eventDetails.eventMainPhotoUrl = res;
									this.waitingForImage = false;
								})
						});
				})
			});
		}
	}

	selectLocation(event) {
		this.mapClicked = true;
		var lat = event.latLng.lat();
		var lng = event.latLng.lng();
		this.markerCenter = { lat: lat, lng: lng };
	}
}


