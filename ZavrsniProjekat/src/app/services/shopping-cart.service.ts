import { Injectable, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { SnackBarService } from './snack-bar.service';
import { Subject } from 'rxjs';
import { CartProduct } from '../models/CartProduct';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnInit {

  numberOfProducts: Subject<number> = new Subject<number>();

  allCartProducts: CartProduct[] = []

  addedProductId: number;
  addedProductImgSrc: string;
  addedProductName: string;
  addedProductPrice: number;
  addedProductQuantity: number;

  constructor(
    private mySnackBar: SnackBarService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getProducts().subscribe({
      next: (data) => {
        this.allCartProducts = data as CartProduct[];
      }
    })
  }

  addToCart(selectedProduct: Product, quantity: string) {
    let addedProduct = new CartProduct(
      this.addedProductId = selectedProduct.id,
      this.addedProductImgSrc = selectedProduct.imgSrc,
      this.addedProductName = selectedProduct.name,
      this.addedProductPrice = selectedProduct.price,
      this.addedProductQuantity = +quantity
    );

    let sameProduct = this.allCartProducts.find(x => x.id == selectedProduct.id);

    if (sameProduct) {
      sameProduct.quantity = +quantity;
      this.editCartProduct(sameProduct).subscribe({
        next: (data) => {
          sameProduct = data as CartProduct;
          this.calculateNumberOfProducts();
          this.mySnackBar.openSnackBar("Your product has been successfully updated!");
        },
        error: (err) => {
          console.log(err.message);
        }
      })
    }
    else {
      this.addNewCartProduct(addedProduct).subscribe({
        next: (data) => {
          this.calculateNumberOfProducts();
          this.mySnackBar.openSnackBar("Your product has been added to the cart!");
        },
        error: (err) => {
          console.log(err.message);
        }
      })
    }

  }

  getProducts() {
    return this.httpClient.get("http://localhost:3000/cartProducts");
  }

  addNewCartProduct(data: CartProduct) {
    return this.httpClient.post("http://localhost:3000/cartProducts", data);
  }

  editCartProduct(data: CartProduct) {
    return this.httpClient.put("http://localhost:3000/cartProducts/" + data.id, data);
  }

  deleteCartProduct(prodId: number) {
    return this.httpClient.delete("http://localhost:3000/cartProducts/" + prodId);
  }

  calculateNumberOfProducts() {
    this.httpClient.get("http://localhost:3000/cartProducts").subscribe({
      next: (data: any) => {
        let all = 0;
        data.forEach((product: CartProduct) => {
          all += product.quantity;
        });
        this.numberOfProducts.next(all);
      }
    })
  }

}
