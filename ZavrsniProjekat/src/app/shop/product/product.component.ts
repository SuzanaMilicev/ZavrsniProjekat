import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FlowersService } from '../../services/flowers.service';
import { ProductCategory } from '../../models/ProductCategory';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  selectedProduct!: Product;

  constructor(
    private route: ActivatedRoute,
    private flowersService: FlowersService,
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

}
