import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/Product';
import { CartProduct } from '../models/CartProduct';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {

  cartProducts : CartProduct[] = [];
  total = 0;
  multiplication = 1;
  // quantity : number;

  constructor(
    private router : Router,
    private CartService : ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.cartProducts = this.CartService.getProducts();
    // this.quantity = this.CartService.getQuantity();
  }

  calculateTotal(){
    this.total = 0;
    this.cartProducts.forEach(prod => {
      // this.total += prod.salary;
    })
  }

  // multiply(){
  //   this.multiplication = 1;

  // }

  quantityChanged(product: CartProduct, newQuantity: string){
    this.total = 0
    this.cartProducts.forEach(prod => {
      if(prod.id == product.id){
        this.total += +newQuantity;
        product.quantity = +newQuantity;
      }
      else{
        // this.total += product.quantity;
      }
    })
  }

  remove(product: CartProduct){
    let index = this.cartProducts.findIndex(x=>x.id == product.id);
    this.cartProducts.splice(index, 1);

    //delete from json dataBase
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
