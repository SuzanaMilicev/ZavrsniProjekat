import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  @ViewChild("logInForm") logInForm: NgForm;

  constructor(
    private mySnackBar: SnackBarService
  ) {
  }

  onSubmit() {
    console.log(this.logInForm.value);
    this.logInForm.reset();
    this.mySnackBar.openSnackBar("You are successfully logged in!");
  }
}
