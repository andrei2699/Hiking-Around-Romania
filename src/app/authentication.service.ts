import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userDisplayName;

  constructor(private _router: Router, private firebaseFunctions: AngularFireFunctions, private firestore: AngularFirestore) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.isLoggedIn.next(true);
        this.userDisplayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.

        this.userDisplayName = "";
        this.isLoggedIn.next(false);
      }
    });

  }

  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  register(name, email, password, userType) {
    if (name && email && password && userType) {
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
        // console.log(res)
        let promises = [];
        promises.push(res.user.updateProfile({
          displayName: name
        }).then(() => {
          this.userDisplayName = name;
        }));
        promises.push(this.firebaseFunctions.httpsCallable('writeUserProfile')({
          userId: res.user.uid,
          name: name,
          type: userType
        }).toPromise());
        return Promise.all(promises).catch(err => {
          console.log(err);
        });
      });
    }
    return new Promise(null);
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this._router.navigate(['/login']);
    }).catch(function (error) {
      console.log(error);
    });
  }
}
