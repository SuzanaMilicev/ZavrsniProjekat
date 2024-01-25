import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackBarService } from '../services/snack-bar.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  @ViewChild("signUpForm") signUpForm: NgForm;

  constructor(
    private mySnackBar: SnackBarService,
    private authService : AuthService
  ) {
  }

  onSubmit(signUpEmail: string, signUpPassword: string) {
    this.authService.signUp(signUpEmail, signUpPassword);
    this.signUpForm.reset();
    // this.mySnackBar.openSnackBar("You are successfully signed up!");    => TU CE DA IDE POZIVANJE MODALA
  }
}
