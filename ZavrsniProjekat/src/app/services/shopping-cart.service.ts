import { Injectable, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { SnackBarService } from './snack-bar.service';
import { Subject } from 'rxjs';
import { CartProduct } from '../models/CartProduct';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

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
    private httpClient: HttpClient,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.getProducts().subscribe({
      next: (data) => {
        this.allCartProducts = data as CartProduct[];
      }
    })
  }

  addToCart(selectedProduct: Product, quantity: string) {
    this.getProducts().subscribe({
      next: (data: any) => {
        let allProducts = data as CartProduct[];
        let isExistProd = allProducts.find(x => x.id == selectedProduct.id);
        if(isExistProd){
          let cartProd = new CartProduct(isExistProd.id, isExistProd.imgSrc, isExistProd.name, isExistProd.price, isExistProd.quantity + +quantity);
          this.editCartProduct(cartProd).subscribe({
            next: (data) => {
              this.mySnackBar.openSnackBar("Your product is successfully updated!");
              this.calculateNumberOfProducts();
            }
          })
        }
        else{
          let cartProd = new CartProduct(selectedProduct.id, selectedProduct.imgSrc, selectedProduct.name, selectedProduct.price, +quantity);
          this.addNewCartProduct(cartProd).subscribe({
            next: (data) => {
              this.mySnackBar.openSnackBar("Your product is successfully added to the cart!");
              this.calculateNumberOfProducts();
            }
          })
        }
      }
    })
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

  getAuthData(){
    const token = this.authService.getToken();
    return this.httpClient.get('https://zavrsniprojekatsuzana-default-rtdb.firebaseio.com/data.json?auth='+token)
  }
}
