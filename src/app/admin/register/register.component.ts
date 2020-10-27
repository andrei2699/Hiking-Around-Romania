import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  // email = new FormControl;
  // password = new FormControl('', [Validators.required]);
  // confirmPassword = new FormControl('', [Validators.required]);
  hide = true;
  constructor(private formBuilder: FormBuilder, public _authSerivice: AuthenticationService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.matchPasswordsValidator('password', 'confirmPassword')
    });
  }

  onSubmit() {
    console.log(this.registerForm.get('email'));
    console.log(this.registerForm);
    // this._authSerivice.register(this.userEmail, this.userPassword)
    //   .subscribe(res => console.log(res));
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

}
