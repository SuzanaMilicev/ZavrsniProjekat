import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  products : Product[] = [];
  quantity!: string;

  constructor() {}

  addToCart(selectedProduct: Product, quantity : string) {
    this.products.push(selectedProduct);
    this.quantity = quantity;
  }

  getProducts() {
    return this.products;
  }

  getQuantity() {
    return Number(this.quantity);
  }
}
