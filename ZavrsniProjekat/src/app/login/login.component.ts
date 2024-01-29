import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackBarService } from '../services/snack-bar.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @ViewChild("logInForm") logInForm: NgForm;

  constructor(
    private mySnackBar: SnackBarService,
    private authService: AuthService
  ) {
  }

  onSubmit(logInEmail: string, logInPassword: string) {
    if (this.authService.isLoggedIn) {
      this.authService.signIn(logInEmail, logInPassword);
      this.logInForm.reset();
      this.mySnackBar.openSnackBar("You are successfully logged in!");
    }
    else {
      this.mySnackBar.openSnackBar("No account matches this combination of e-mail and password.");
    }
  }

  forgotPassword(logInEmail: string) {
    if (logInEmail) {
      this.authService.forgotPassword(logInEmail);
      this.mySnackBar.openSnackBar("Our team will send you an e-mail with steps for password-recovery!");
    }
    else {
      this.mySnackBar.openSnackBar("Please enter your contact e-mail!");
    }
  }
}
