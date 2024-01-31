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
  currentProductCat = "";

  constructor(
    private route: ActivatedRoute,
    private flowersService: FlowersService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.currentProductCat = this.route.snapshot.params['catId'];
    this.getProductsByCategory(this.route.snapshot.params['catId']);
    this.route.params.subscribe(
      (params: Params) => {
        this.getProductsByCategory(params['catId']);
        this.currentProductCat = params['catId'];
      }
    );
  }

  getProductsByCategory(catId: number){
    this.flowersService.getProductsByCategory(catId).subscribe({
      next: (data) => {
        this.products = data;
      }
    })
  }

  selectedProduct(catId: number){
    this.router.navigate(['/product', catId]);
  }
}
