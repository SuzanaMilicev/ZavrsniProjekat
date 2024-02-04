import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartProduct } from '../models/CartProduct';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {

  data : string[] = [];

  cartProducts: CartProduct[] = [];
  subtotal = 0;

  constructor(
    private router: Router,
    private CartService: ShoppingCartService,
    private mySnackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.CartService.getProducts().subscribe({
      next: (data) => {
        this.cartProducts = data as CartProduct[];
        this.calculateSubTotal();
      }
    })

    this.CartService.getAuthData().subscribe({
      next: (data: any) => {
        this.data = data;
      },
      error : (err) => {
        alert(err.message);
      }
    })
  }

  calculateSubTotal(): number {
    this.subtotal = 0;
    this.cartProducts.forEach(prod => {
      this.subtotal += prod.price * prod.quantity;
    })
    return this.subtotal;
  }

  quantityChanged(product: CartProduct, newQuantity: string) {
    if (+newQuantity <= 100 && +newQuantity >= 1) {
      this.cartProducts.forEach(prod => {
        if (prod.id == product.id) {
          product.quantity = +newQuantity;
          this.CartService.editCartProduct(product).subscribe({
            next: (data) => {
              product = data as CartProduct;
              this.CartService.calculateNumberOfProducts();
            },
            error: (err) => {
              console.log(err.message);
            }
          })
          this.calculateSubTotal();
        }
        else {
          this.calculateSubTotal();
        }
      })
    }
    else {
      if (+newQuantity == 0) {
        this.remove(product);
      }
      else {
        this.subtotal = 0;
        this.mySnackBar.openSnackBar("Quantity must be between 1 and 100!");
      }
    }
  }

  remove(product: CartProduct) {
    let index = this.cartProducts.findIndex(x => x.id == product.id);
    this.CartService.deleteCartProduct(product.id).subscribe({
      next: (data) => {
        this.cartProducts.splice(index, 1);
        this.calculateSubTotal();
        this.CartService.calculateNumberOfProducts();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  checkout() {
    this.router.navigate(['/product-order']);
  }
}