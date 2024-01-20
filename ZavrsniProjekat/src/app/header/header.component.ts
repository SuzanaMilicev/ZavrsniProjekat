import { Component } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  prodNumber = 0;

  constructor(
    private CartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    let allCartProducts = this.CartService.getProducts();

    this.CartService.productsInCart.subscribe({
      next: (data: number) => {
        if (allCartProducts.length >= 1) {
          this.prodNumber = allCartProducts.length;
        }
        else if (allCartProducts.length == 0) {
          this.prodNumber = 0;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
