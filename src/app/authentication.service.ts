import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userDisplayName;

  constructor(private firebaseFunctions: AngularFireFunctions) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.isLoggedIn.next(true);
        this.userDisplayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        this.userDisplayName = "";
        this.isLoggedIn.next(false);
      }
    });

  }

  checkIfIdBelongsToLoggedUser(idToBeTested) {
    const user = firebase.auth().currentUser;
    return user && user.uid == idToBeTested;
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

        const writeUserProfile = this.firebaseFunctions.httpsCallable('writeUserProfile');
        promises.push(writeUserProfile({
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
    return firebase.auth().signOut();
  }

  getCurrentUserId() {
    if (firebase.auth().currentUser)
      return firebase.auth().currentUser.uid;
    return undefined;
  }
}
