import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { SnackBarService } from './snack-bar.service';
import { Subject } from 'rxjs';
import { CartProduct } from '../models/CartProduct';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartProducts: CartProduct[] = [];

  addedProductId: number;
  addedProductImgSrc: string;
  addedProductName: string;
  addedProductPrice: number;
  addedProductQuantity: number;

  // numberOfProducts: Subject<number>;

  constructor(
    private mySnackBar: SnackBarService,
  ) { }

  addToCart(selectedProduct: Product, quantity: string) {

    let addedProduct = new CartProduct(
      this.addedProductId = selectedProduct.id,
      this.addedProductImgSrc = selectedProduct.imgSrc,
      this.addedProductName = selectedProduct.name,
      this.addedProductPrice = selectedProduct.price,
      this.addedProductQuantity = +quantity
    );

    this.cartProducts.push(addedProduct);
    this.mySnackBar.openSnackBar("Your product has been added to the cart!");
  }

  getProducts() {
    return this.cartProducts;
  }
}
