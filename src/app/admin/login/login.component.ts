import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'protractor';
import { AuthenticationService } from 'src/app/authentication.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  hide = true;
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public _authSerivice: AuthenticationService, private _snackBar: MatSnackBar,private _router: Router,public translate: TranslateService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this._authSerivice.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .then(() => {
        this._router.navigate(['/home']);
        let successful_login_message;
        this.translate.get('LOGIN.SUCCESSFUL_LOGIN').subscribe(msg => {successful_login_message = msg });
        let end_message;
        this.translate.get('SNACKBAR.END_NOW').subscribe(msg => {end_message = msg });
        this.openSnackBar(successful_login_message, end_message);
      })
      .catch((error) => {
        if (error.code == "auth/user-not-found" || error.code == "auth/wrong-password") {
          let login_error;
          this.translate.get('LOGIN.INVALID_CREDENTIALS').subscribe(msg => {login_error = msg });
          let end_message;
          this.translate.get('SNACKBAR.END_NOW').subscribe(msg => {end_message = msg });
          this.openSnackBar(login_error, end_message);
        }
      });
  }

  openSnackBar(success, end_now)
  {
    this._snackBar.open(success, end_now, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
