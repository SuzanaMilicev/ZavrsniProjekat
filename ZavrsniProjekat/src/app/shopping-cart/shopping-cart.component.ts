import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartProduct } from '../models/CartProduct';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {

  cartProducts: CartProduct[] = [];
  subtotal = 0;

  constructor(
    private router: Router,
    private CartService: ShoppingCartService,
    private mySnackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.cartProducts = this.CartService.getProducts();
    this.calculateSubTotal();
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
          this.calculateSubTotal();
        }
        else {
          this.calculateSubTotal();
        }
      })
    }
    else {
      this.subtotal = 0;
      this.mySnackBar.openSnackBar("Quantity must be between 1 and 100!");
    }
  }

  remove(product: CartProduct) {
    let index = this.cartProducts.findIndex(x => x.id == product.id);
    this.cartProducts.splice(index, 1);

    this.calculateSubTotal();

    this.CartService.changeProductNumber(this.cartProducts.length);

    // delete from json dataBase
    // this.CartService.deleteProduct(product.id).subscribe({
    //   next: (data) => {
    //     this.cartProducts.splice(index, 1);
    //     this.calculateTotal();
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
  }

  checkout() {
    this.router.navigate(['/product-order']);
  }
}