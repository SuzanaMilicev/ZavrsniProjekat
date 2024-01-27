import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackBarService } from '../services/snack-bar.service';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatRegisteredDialogComponent } from '../mat-dialog/mat-registered-dialog/mat-registered-dialog/mat-registered-dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  @ViewChild("signUpForm") signUpForm: NgForm;

  constructor(
    private mySnackBar: SnackBarService,
    private authService : AuthService,
    private signUpDialog : MatDialog

  ) {
  }

  onSubmit(signUpEmail: string, signUpPassword: string) {
    this.authService.signUp(signUpEmail, signUpPassword);
    this.signUpDialog.open(MatRegisteredDialogComponent);
    this.signUpForm.reset();
  }
}
