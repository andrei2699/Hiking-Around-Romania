import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/authentication.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  registerForm: FormGroup;
  hide = true;
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    public authSerivice: AuthenticationService,
    public translate: TranslateService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      userType: ['', [Validators.required]]
    }, {
      validator: this.matchPasswordsValidator('password', 'confirmPassword')
    });
  }

  onSubmit() {
    this.authSerivice.register(this.registerForm.get('name').value, this.registerForm.get('email').value, this.registerForm.get('password').value, this.registerForm.get('userType').value)
      .then((u) => {
        this._router.navigate(['/']);
        let successful_register_message;
        this.translate.get('REGISTER.SUCCESSFUL_REGISTRATION').subscribe(msg => { successful_register_message = msg });
        let end_message;
        this.translate.get('SNACKBAR.END_NOW').subscribe(msg => { end_message = msg });
        this.openSnackBar(successful_register_message, end_message);
        console.log(u);
        this.authSerivice.updateUser();
      })
      .catch((error) => {
        if (error.code == "auth/email-already-in-use") {
          // this.showEmailInUseError();

          let register_error;
          this.translate.get('REGISTER.EMAIL_USED').subscribe(msg => { register_error = msg });
          let end_message;
          this.translate.get('SNACKBAR.END_NOW').subscribe(msg => { end_message = msg });
          this.openSnackBar(register_error, end_message);
        }
      });
  }

  matchPasswordsValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  showEmailInUseError() {
    let control = this.registerForm.get('email');
    if (control.errors && !control.errors.mustMatch) {
      return;
    }
    control.setErrors({ emailInUse: true });
  }

  openSnackBar(success, end_now) {
    this._snackBar.open(success, end_now, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
