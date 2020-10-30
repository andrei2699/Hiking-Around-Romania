import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _router: Router) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.isLoggedIn.next(true);
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        this.isLoggedIn.next(false);
      }
    });

  }

  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  register(name, email, password,userType) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this._router.navigate(['/login']);
    }).catch(function (error) {
      console.log(error);
    });
  }
}
