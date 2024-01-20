import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../models/Product';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FlowersService } from '../../services/flowers.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  selectedProduct: Product;

  constructor(
    private route: ActivatedRoute,
    private flowersService: FlowersService,
    public cartService: ShoppingCartService,
    private mySnackBar: SnackBarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProductById(this.route.snapshot.params['id']);
    this.route.params.subscribe(
      (params: Params) => {
        this.getProductById(params['id']);
      }
    )
  }

  getProductById(catId: number) {
    let temp = this.flowersService.getProductById(catId);
    if (temp) {
      this.selectedProduct = temp;
    }
  }

  nextProduct() {
    this.selectedProduct = this.flowersService.getNextProduct(this.selectedProduct.id);
  }

  previousProduct() {
    this.selectedProduct = this.flowersService.getPrevProduct(this.selectedProduct.id);
  }

  onAddToCart(product: Product, quantity: string) {
    if (+quantity <= 100 && +quantity >= 1) {
      this.cartService.addToCart(product, quantity);

      let allCartProducts = this.cartService.getProducts();
      this.cartService.changeProductNumber(allCartProducts.length);
    }
    else {
      this.mySnackBar.openSnackBar("Quantity must be between 1 and 100!");
    }
  }

}
