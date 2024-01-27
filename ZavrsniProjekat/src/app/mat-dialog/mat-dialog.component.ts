import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrl: './mat-dialog.component.css'
})
export class MatDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MatDialogComponent>
  ){}

  closeDialog() {
    this.dialogRef.close();
  }

}
