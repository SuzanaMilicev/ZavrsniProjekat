import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FlowersService } from '../../services/flowers.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { CartProduct } from '../../models/CartProduct';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../../mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  allCartProducts: CartProduct[] = [];

  selectedProduct: Product;

  constructor(
    private route: ActivatedRoute,
    private flowersService: FlowersService,
    public cartService: ShoppingCartService,
    private mySnackBar: SnackBarService,
    private authService : AuthService,
    private logInDialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.getProductById(this.route.snapshot.params['id']);
    this.route.params.subscribe(
      (params: Params) => {
        this.getProductById(params['id']);
      }
    )

    this.cartService.getProducts().subscribe({
      next: (data) => {
        this.allCartProducts = data as CartProduct[];
        let all = 0;
        this.allCartProducts.forEach((product: CartProduct) => {
          all += product.quantity;
        });
        this.cartService.numberOfProducts.next(all);
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }

  getProductById(catId: number) {
    this.flowersService.getProductById(catId).subscribe({
      next: (data) => {
        if(data){
          this.selectedProduct = data;
        }
      }
    })
  }

  nextProduct() {
    this.flowersService.getNextProduct(this.selectedProduct.id).subscribe({
      next: (data) => {
        this.selectedProduct = data;
      }
    });
  }

  previousProduct() {
    this.flowersService.getPrevProduct(this.selectedProduct.id).subscribe({
      next: (data) => {
        this.selectedProduct = data;
      }
    })
  }

  onAddToCart(product: Product, quantity: string) {
    if (this.authService.isLoggedIn == true) {
      if (+quantity <= 100 && +quantity >= 1) {
        this.cartService.addToCart(product, quantity);
        this.cartService.calculateNumberOfProducts();
      }
      else {
        this.mySnackBar.openSnackBar("Quantity must be between 1 and 100!");
      }
    }
    else {
      this.logInDialog.open(MatDialogComponent);
    }
  }
}
