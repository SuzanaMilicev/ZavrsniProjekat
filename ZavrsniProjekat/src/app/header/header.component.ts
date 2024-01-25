import { Component } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartProduct } from '../models/CartProduct';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  prodNumber : number = 0;
  allCartProducts: CartProduct[] = [];

  constructor(
    private CartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.CartService.getProducts().subscribe({
      next: (data) => {
        this.allCartProducts = data as CartProduct[];
        this.CartService.calculateNumberOfProducts();
      }
    })

    this.CartService.numberOfProducts.subscribe((res: number) => {
      this.prodNumber = res;
    })
  }
}
