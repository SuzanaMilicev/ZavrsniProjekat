import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrl: './product-order.component.css'
})
export class ProductOrderComponent implements OnInit {

  checkoutForm: FormGroup;

  constructor(
    private router : Router,
    private mySnackBar : SnackBarService
  ) {}

  ngOnInit(): void {
    this.checkoutForm = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.minLength(3)]),
      'surname': new FormControl("", [Validators.required, Validators.minLength(3)]),
      "email": new FormControl("", [Validators.required, Validators.email]),
      "phone": new FormControl("", [Validators.required, Validators.minLength(5)]),
      'address': new FormControl("", [Validators.required, Validators.minLength(3)]),
      "comment": new FormControl(""),
      "payment": new FormControl("Credit Card", Validators.required)
    })
  }

  onConfirm(){
    if(this.checkoutForm.valid){
      console.log(this.checkoutForm);
      /*ocistiti sadrzaj korpe */
      this.router.navigate(['/']);
      this.mySnackBar.openSnackBar("Your order has been successfully placed!");
    }
    else{
      this.checkoutForm.markAllAsTouched();
    }
  }
}
