import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-registered-dialog',
  templateUrl: './mat-registered-dialog.component.html',
  styleUrl: './mat-registered-dialog.component.css'
})
export class MatRegisteredDialogComponent {

  constructor(
    private authService : AuthService,
    public dialogRef: MatDialogRef<MatRegisteredDialogComponent>
  ) {
  }

  resendEmail() {
    this.authService.sendVerificationMail(this.authService.userData);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
