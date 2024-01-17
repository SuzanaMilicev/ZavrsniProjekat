import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  products : Product[] = [];
  quantity: number;

  constructor(
    private mySnackBar: SnackBarService,
  ) {}

  addToCart(selectedProduct: Product, quantity : string) {
    this.products.push(selectedProduct);
    this.quantity = +quantity;
    this.mySnackBar.openSnackBar("Your product has been added to the cart!");
  }

  getProducts() {
    return this.products;
  }

  getQuantity() {
    return this.quantity;
  }
}
