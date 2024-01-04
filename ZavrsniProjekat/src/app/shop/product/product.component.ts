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
  allCat!: ProductCategory[];
  currentCat!: number;

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

    // this.allCat = this.flowersService.getAllCategories();
    // this.selectCategory(this.allCat[0].name)
  }

  // selectCategory(catName: string){
  //   return this.currentCat = catName;
  // }



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

// getProductCategory(catId: number) {
//   let temp = this.flowerService.getProductById(catId);
//   if (temp && temp.catId == 1) {
//     this.tempCategory = "Sympathy";
//   }
//   else if (temp && temp.catId == 2) {
//     this.tempCategory = "Anniversary";
//   }
//   else if (temp && temp.catId == 3) {
//     this.tempCategory = "Congratulations";
//   }
//   else {
//     this.tempCategory = "Get Well";
//   }
// }

