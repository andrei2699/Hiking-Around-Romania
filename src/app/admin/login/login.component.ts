import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'protractor';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public _authSerivice: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this._authSerivice.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .then(() => {
        // todo: redirect user to other page; login succesful
      })
      .catch((error) => {
        console.log(error);
        // todo display error mesage to user
        if (error.code == "auth/user-not-found" || error.code == "auth/wrong-password") {
          console.log("Email or password incorrect");
        }
      });
  }
}
