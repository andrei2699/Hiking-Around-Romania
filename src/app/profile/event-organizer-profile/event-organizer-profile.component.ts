import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventOrganizerProfile } from './event-organizer-profile'
import { ProfileService } from '../profile.service'
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-event-organizer-profile',
  templateUrl: './event-organizer-profile.component.html',
  styleUrls: ['./event-organizer-profile.component.scss']
})
export class EventOrganizerProfileComponent implements OnInit {

  constructor(public translate: TranslateService,
    public dialog: MatDialog,
    private _authService: AuthenticationService,
    private _profileService: ProfileService,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar) { }


  @ViewChild('otherPhotoFileInput') otherPhotoFileInput: ElementRef;
  @ViewChild('profilePhotoFileInput') profilePhotoFileInput: ElementRef;

  unavailableImageUrl = 'https://www.metrorollerdoors.com.au/wp-content/uploads/2018/02/unavailable-image.jpg';

  maximumNumberOfOtherPhotos: number = 21;

  isEditing = false;
  organizerProfile: EventOrganizerProfile;
  private selectedOtherPhotoIndex = -1;
  isCurrentUser = false;

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      this.isCurrentUser = this._authService.checkIfIdBelongsToLoggedUser(userId);

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

  addOtherPhoto() {
    this.organizerProfile.otherPhotosUrl.push("");
  }

  openProfilePhotoDialog() {
    this.profilePhotoFileInput.nativeElement.click();
  }

  editOtherPhoto(index) {
    this.selectedOtherPhotoIndex = index;
    this.otherPhotoFileInput.nativeElement.click();
  }

  deleteOtherPhoto(index) {
    if (index < 0) return;
    if (index >= this.organizerProfile.otherPhotosUrl.length) return;

    this.translate.get('DIALOG.DELETE_ELEMENT').subscribe(title => {
      this.translate.get('DIALOG.ARE_YOU_SURE_DELETE_ELEMENT').subscribe(message => {
        this.translate.get('DIALOG.YES').subscribe(yesText => {
          this.translate.get('DIALOG.NO').subscribe(noText => {
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
              width: '250px',
              data: {
                title: title,
                content: message,
                yesButtonText: yesText,
                noButtonText: noText,
                confirmValue: undefined
              }
            });

            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                this.organizerProfile.otherPhotosUrl.splice(index, 1);
              }
            });
          });
        });
      });
    });
  }

  changeOtherPhoto(files) {
    if (this.selectedOtherPhotoIndex >= 0 &&
      this.selectedOtherPhotoIndex < this.organizerProfile.otherPhotosUrl.length) {
      this._profileService.uploadPhoto(this.organizerProfile, files[0], "" + this.selectedOtherPhotoIndex)
        .then(() => {
          this._profileService.getPhoto(this.organizerProfile, "" + this.selectedOtherPhotoIndex)
            .subscribe(res => {
              this.organizerProfile.otherPhotosUrl[this.selectedOtherPhotoIndex] = res;
              this.selectedOtherPhotoIndex = -1;
            });
        });
    }
    else {
      this.selectedOtherPhotoIndex = -1;
    }
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
}
