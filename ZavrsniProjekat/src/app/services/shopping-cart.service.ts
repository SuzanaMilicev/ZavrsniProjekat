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

  productsInCart: Subject<number> = new Subject<number>();

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

    let sameProduct = this.allCartProducts.find(x => x.id === selectedProduct.id);

    if (sameProduct) {
      this.editCartProduct(addedProduct).subscribe({
        next: (data) => {
          addedProduct = data as CartProduct;
        },
        error: (err) => {
          console.log(err.message);
        }
      })
      this.mySnackBar.openSnackBar("Your product has been successfully updated!");
    }
    else {
      this.addNewCartProduct(addedProduct).subscribe({
        next: (data) => {
          // this.productsInCart.next(this.allCartProducts.length);
          this.changeProductNumber(this.allCartProducts.length);
        },
        error: (err) => {
          console.log(err.message);
        }
      })
      this.mySnackBar.openSnackBar("Your product has been added to the cart!");
    }




    // this.allCartProducts.forEach(prod => {
    //   if (prod.id == selectedProduct.id) {
    //     prod.quantity = this.addedProductQuantity;
    //     this.editCartProduct(prod).subscribe({
    //       next: (data) => {
    //         prod = data as CartProduct;
    //       },
    //       error: (err) => {
    //         console.log(err.message);
    //       }
    //     })
    //     this.mySnackBar.openSnackBar("Your product has been successfully updated!");
    //   }
    //   else {
    //     this.addNewCartProduct(addedProduct).subscribe({
    //       next: (data) => {
    //         this.changeProductNumber(this.allCartProducts.length);
    //       },
    //       error: (err) => {
    //         console.log(err.message);
    //       }
    //     })
    //     this.mySnackBar.openSnackBar("Your product has been added to the cart!");
    //   }
    // })
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

  changeProductNumber(productsInCart: number) {
    this.productsInCart.next(productsInCart);
  }

}
