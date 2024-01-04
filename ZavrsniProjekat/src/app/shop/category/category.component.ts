import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { FlowersService } from '../../services/flowers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private flowersService: FlowersService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getProductsByCategory(this.route.snapshot.params['catId']);
    this.route.params.subscribe(
      (params: Params) => {
        this.getProductsByCategory(params['catId']);
      }
    )
  }

  getProductsByCategory(catId: number){
    this.products = this.flowersService.getProductsByCategory(catId);
  }

  selectedProduct(catId: number){
    this.router.navigate(['/product', catId]);
  }
}
