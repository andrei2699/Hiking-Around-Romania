import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _loginUrl = '';
  private _registerUrl = '';

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient, private _router: Router) { }

  login(email, password) {
    this.isLoggedIn.next(true);
  }

  register(email, password) {
    return this._http.post(this._registerUrl, JSON.stringify({
      Email: email,
      Password: password
    }));
  }

  logout() {
    this.isLoggedIn.next(false);
    this._router.navigate(['/login']);
  }
}
