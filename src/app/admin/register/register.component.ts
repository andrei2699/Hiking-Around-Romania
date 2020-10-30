import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hide = true;
  constructor(private formBuilder: FormBuilder,
    public _authSerivice: AuthenticationService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
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
    this._authSerivice.register(this.registerForm.get('name'), this.registerForm.get('email').value, this.registerForm.get('password').value, this.registerForm.get('userType').value)
      .catch((error) => {
        console.log(error);
        if (error.code == "auth/email-already-in-use") {
          this.showEmailInUseError();
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
}
