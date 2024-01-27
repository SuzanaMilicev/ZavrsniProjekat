import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MyUser } from '../../../models/My User';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '../../../services/snack-bar.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-mat-registered-dialog',
  templateUrl: './mat-registered-dialog.component.html',
  styleUrl: './mat-registered-dialog.component.css'
})
export class MatRegisteredDialogComponent {

  userData : MyUser; 

  constructor(
    private authService : AuthService,
    public dialogRef: MatDialogRef<MatRegisteredDialogComponent>,
    private mySnackBar : SnackBarService,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
  ) {
    this.angularFireAuth.authState.subscribe((user: any) => {
      if (user) {
        this.userData = user;
        if (localStorage) {
          localStorage.setItem('user', JSON.stringify(this.userData));
        }
      }
      else {
        //za log out, da li treba?
        if (localStorage) {
          localStorage.setItem('user', 'null');
        }
      }
    })
  }

  resendEmail() {
    this.authService.sendVerificationMail(this.userData);
    this.mySnackBar.openSnackBar("Check your mailbox for another verification e-mail!");
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
