import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {


  constructor(
    private router : Router
  ) {}

  checkout() {
    this.router.navigate(['/product-order']);
  }
}
