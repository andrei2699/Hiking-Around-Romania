import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { UNAVAILABLE_IMG_URL } from '../unavailable_img_url';

@Component({
  selector: 'app-photo-array',
  templateUrl: './photo-array.component.html',
  styleUrls: ['./photo-array.component.scss']
})
export class PhotoArrayComponent implements OnInit {
  @ViewChild('otherPhotoFileInput') otherPhotoFileInput: ElementRef;

  @Input() isEditing: boolean;
  @Input() photoUrlArray: string[];
  @Output() photoUrlArrayChange = new EventEmitter<string[]>();
  @Output() requestPhotoChange = new EventEmitter();

  unavailableImageUrl = UNAVAILABLE_IMG_URL;
  maximumNumberOfOtherPhotos: number = 21;
  selectedOtherPhotoIndex = -1;

  constructor(public translate: TranslateService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editOtherPhoto(index) {
    this.selectedOtherPhotoIndex = index;
    this.otherPhotoFileInput.nativeElement.click();
  }

  deleteOtherPhoto(index) {
    if (index < 0) return;
    if (index >= this.photoUrlArray.length) return;

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
                this.photoUrlArray.splice(index, 1);
                this.photoUrlArrayChange.emit(this.photoUrlArray);
              }
            });
          });
        });
      });
    });
  }

  changeOtherPhoto(files) {
    if (this.selectedOtherPhotoIndex >= 0 &&
      this.selectedOtherPhotoIndex < this.photoUrlArray.length) {
      this.requestPhotoChange.emit({ index: this.selectedOtherPhotoIndex, file: files[0] });
    }
    this.selectedOtherPhotoIndex = -1;
  }

  addOtherPhoto() {
    this.photoUrlArray.push("");
    this.photoUrlArrayChange.emit(this.photoUrlArray);
  }
}
