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

  // displayedColumns: string[] = [
  //   '', '', '', '', '', ''
  // ]

  // dataSource: MatTableDataSource<any>;
  // quantityValue: number;
  // price: number;
  
  multiplicationResult: number;
  total: number;
  shipping: number;

  cartProducts: CartProduct[] = [];
  subtotal = 0;

  constructor(
    private router: Router,
    private CartService: ShoppingCartService,
    private mySnackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.cartProducts = this.CartService.getProducts();

    this.calculateFinalPrice();
    this.calculateSubTotal();
    this.calculateTotal();
    // this.dataSource = new MatTableDataSource(this.cartProducts);
  }


  calculateFinalPrice() {
    this.cartProducts.forEach(prod => {
      this.multiplicationResult = this.calcFinalPrice(prod.quantity, prod.price);
    })
  }

  calcFinalPrice(a: number, b: number): number {
    return this.multiplicationResult = a * b;
  }


  calculateSubTotal(): number {
    this.subtotal = 0;
    this.cartProducts.forEach(prod => {
      this.subtotal += this.multiplicationResult;
    })
    return this.subtotal;
  }


  calculateTotal() {
    this.total = this.calcTotal(+this.subtotal, +this.shipping);
  }

  calcTotal(a: number, b: number): number {
    return this.total = a + b;
  }


  quantityChanged(product: CartProduct, newQuantity: string) {
    this.total = 0
    if (+newQuantity <= 100 && +newQuantity >= 1) {
      this.cartProducts.forEach(prod => {
        if (prod.id == product.id) {
          product.quantity = +newQuantity;
          this.calcFinalPrice(prod.quantity, prod.price);
          this.calculateSubTotal();
          this.calculateTotal();
        }
        else {
          this.calcFinalPrice(prod.quantity, prod.price);
          this.calculateSubTotal();
          this.calculateTotal();
        }
      })
    }
    else {
      this.multiplicationResult = 0;
      this.total = 0;
      this.calculateSubTotal();
      this.mySnackBar.openSnackBar("Quantity must be between 1 and 100!");
    }
  }

  remove(product: CartProduct) {
    let index = this.cartProducts.findIndex(x => x.id == product.id);
    this.cartProducts.splice(index, 1);

    this.calculateSubTotal();
    this.calculateTotal();

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





  
  // removeMaterialTable(selectedRow: any){
  //   let index = this.cartProducts.findIndex(x=>x.id == selectedRow.id);
  //   this.cartProducts.splice(index, 1);

  //   this.CartService.deleteProduct(selectedRow.id).subscribe({
  //     next: (data) => {
  //       this.cartProducts.splice(index, 1);
  //       this.calculateTotal();
  //       this.dataSource = new MatTableDataSource(this.cartProducts);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }

  // quantityChangedMaterialTable(selectedRow: any, quantity: string){
  //   let index = this.cartProducts.findIndex(x=>x.id == selectedRow.id);
  //   this.cartProducts[index].quantity = +quantity;
  //   this.calculateFinalPrice();
  //   this.calculateSubTotal();
  //   this.calculateTotal();
  //   this.dataSource = new MatTableDataSource(this.cartProducts);
  // }


}
