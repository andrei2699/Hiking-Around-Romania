import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventOrganizerProfile } from './event-organizer-profile'
import { ProfileService } from '../profile.service'
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/authentication.service';
import { UNAVAILABLE_IMG_URL } from '../../unavailable_img_url'

@Component({
  selector: 'app-event-organizer-profile',
  templateUrl: './event-organizer-profile.component.html',
  styleUrls: ['./event-organizer-profile.component.scss']
})
export class EventOrganizerProfileComponent implements OnInit {

  constructor(public translate: TranslateService,
    private _authService: AuthenticationService,
    private _profileService: ProfileService,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar) { }


  @ViewChild('profilePhotoFileInput') profilePhotoFileInput: ElementRef;

  unavailableImageUrl = UNAVAILABLE_IMG_URL;

  isEditing = false;
  organizerProfile: EventOrganizerProfile;
  isCurrentUser = false;

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      this._authService.checkIfIdBelongsToLoggedUser(userId)
        .subscribe(r => {
          console.log(r)
          this.isCurrentUser = r;
        });

      this._profileService.getProfile(userId)
        .subscribe(res => {
          const data = res.data();
          if (data && data.userType == "event_organizer") {
            this.organizerProfile = {
              userId: userId,
              name: data.name,
              description: data.description ? data.description : "",
              profilePhotoUrl: data.profilePhotoUrl ? data.profilePhotoUrl : "",
              otherPhotosUrl: data.otherPhotosUrl ? data.otherPhotosUrl : []
            };
          } else {
            this.organizerProfile = undefined;
          }
        }, err => {
          console.log(err);
        });
    });
  }

  editProfile() {
    this.isEditing = true;
  }

  saveProfileAndShowSnackbar() {
    this.saveProfile();
  }

  uploadPhoto(files) {
    this._profileService.uploadPhoto(this.organizerProfile, files[0])
      .then(() => {
        this._profileService.getPhoto(this.organizerProfile)
          .subscribe(res => {
            this.organizerProfile.profilePhotoUrl = res;
          })
      });
  }

  openProfilePhotoDialog() {
    this.profilePhotoFileInput.nativeElement.click();
  }

  private saveProfile() {
    this._profileService.saveProfile(this.organizerProfile)
      .then(() => {
        this.isEditing = false;

        this.translate.get('PROFILE.PROFILE_SAVED').subscribe(message => {
          this.translate.get('PROFILE.CLOSE').subscribe(action => {
            this._snackBar.open(message, action, {
              duration: 2000,
              horizontalPosition: "center",
              verticalPosition: "top"
            });
          });
        });
      });
  }

  changeOtherPhoto(value) {
    this._profileService.uploadPhoto(this.organizerProfile, value.file, "" + value.index)
      .then(() => {
        this._profileService.getPhoto(this.organizerProfile, "" + value.index)
          .subscribe(res => {
            this.organizerProfile.otherPhotosUrl[value.index] = res;
          });
      });
  }
}
