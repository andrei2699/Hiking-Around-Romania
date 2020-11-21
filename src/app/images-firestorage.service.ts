import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImagesFirestorageService {

  constructor(private _firestorage: AngularFireStorage) { }

  getPhoto(folderName, fileName) {
    return this._firestorage.ref(`${folderName}/${fileName}`).getDownloadURL();
  }

  uploadPhoto(folderName, fileName, file) {
    return this._firestorage.upload(`${folderName}/${fileName}`, file);
  }

  getPhotoWithNameVariation(folderName, fileName, nameVariation?: number | string) {
    if (nameVariation) {
      fileName += "_" + nameVariation;
    }
    return this.getPhoto(folderName, fileName);
  }

  uploadPhotoWithNameVariation(folderName, fileName, file, nameVariation?: number | string) {
    if (nameVariation) {
      fileName += "_" + nameVariation;
    }
    return this.uploadPhoto(folderName, fileName, file);
  }
}
