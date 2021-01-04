import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userDisplayName;

  private currentUserBehaviorSubject: BehaviorSubject<firebase.User> = new BehaviorSubject(undefined);

  constructor(private firebaseFunctions: AngularFireFunctions,
    private firestore: AngularFirestore) {

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      this.currentUserBehaviorSubject.next(user);
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

  updateUser() {
    this.currentUserBehaviorSubject.next(firebase.auth().currentUser);
  }

  checkIfIdBelongsToLoggedUser(idToBeTested) {
    return this.currentUserBehaviorSubject.pipe(map(user => {
      return user && user.uid == idToBeTested;
    }));
  }

  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password).catch(er => console.log(er));
  }

  loginWithGoogle() {
    return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        const userData = res.user;

        return this.firestore.doc(`profiles/${userData.uid}`).get().pipe(switchMap(doc => {
          const data = doc.data();
          if (!data) {
            return this.firebaseFunctions.httpsCallable('writeUserProfile')({
              userId: userData.uid,
              name: userData.displayName,
              type: 'regular_user'
            });
          } else {
            return of(null);
          }
        }));
      });

    // return this.firestore.doc(`profiles/${userData.uid}`).get().pipe(switchMap(profile => {
    //   console.log(profile);
    //   if (!profile) {
    //     // return this.firebaseFunctions.httpsCallable('writeUserProfile')({
    //     //   userId: userData.uid,
    //     //   name: userData.displayName,
    //     //   type: 'regular_user'
    //     // })
    //   }
    // }));
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
    return this.currentUserBehaviorSubject.pipe(map(user => {
      if (user)
        return user.uid;
      return undefined;
    }));
  }

  isCurrentUserRegularUser() {
    return this.currentUserBehaviorSubject.pipe(
      filter(u => {
        if (u && u.uid)
          return true;
        return false;
      }), mergeMap(user => {
        return this.firestore.doc(`profiles/${user.uid}`).get()
          .pipe(map(profile => {
            const data = profile.data();
            if (data) {
              if (data.userType == 'regular_user') {
                return true;
              }
            }
            return false;
          }));
      }));
  }

  isCurrentUserOrganizer() {
    return this.currentUserBehaviorSubject.pipe(
      filter(u => {
        if (u && u.uid)
          return true;
        return false;
      }), mergeMap(user => {
        return this.firestore.doc(`profiles/${user.uid}`).get()
          .pipe(map(profile => {
            const data = profile.data();
            if (data) {
              if (data.userType == 'event_organizer') {
                return true;
              }
            }
            return false;
          }));
      }));
  }
}
