import { Component } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartProduct } from '../models/CartProduct';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  prodNumber = 0;
  allCartProducts: CartProduct[] = [];

  constructor(
    private CartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.CartService.getProducts().subscribe({
      next: (data) => {
        this.allCartProducts = data as CartProduct[];
      }
    })

    this.CartService.productsInCart.subscribe({
      next: (data: number) => {
        if (this.allCartProducts.length >= 1) {
          this.prodNumber = this.allCartProducts.length;
          // this.CartService.changeProductNumber(this.prodNumber);
        }
        else if (this.allCartProducts.length == 0) {
          this.prodNumber = 0;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
