import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  @ViewChild("signUpForm") signUpForm: NgForm;

  constructor(
    private mySnackBar: SnackBarService
  ) {
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    this.signUpForm.reset();
    this.mySnackBar.openSnackBar("You are successfully signed up!");
  }
}
