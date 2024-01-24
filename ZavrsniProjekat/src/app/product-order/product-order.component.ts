import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snack-bar.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartProduct } from '../models/CartProduct';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrl: './product-order.component.css'
})
export class ProductOrderComponent implements OnInit {

  allCartProducts: CartProduct[] = [];

  checkoutForm: FormGroup;

  constructor(
    private router: Router,
    private mySnackBar: SnackBarService,
    private cartService: ShoppingCartService
  ) { }

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

    this.cartService.getProducts().subscribe({
      next: (data) => {
        this.allCartProducts = data as CartProduct[];
      }
    })
  }

  onConfirm() {
    if (this.checkoutForm.valid) {
      this.allCartProducts.forEach(product => {
        this.cartService.deleteCartProduct(product.id).subscribe({
          next: (data) => {
            this.allCartProducts.splice(product.id, 1);
            this.cartService.changeProductNumber(this.allCartProducts.length);
          },
          error: (err) => {
            console.log(err);
          }
        })
      });
      this.router.navigate(['/']);
      this.mySnackBar.openSnackBar("Your order has been successfully placed!");
    }
    else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}
