import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../models/ProductCategory';
import { FlowersService } from '../services/flowers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{

  allCat!: ProductCategory[];
  currentCat!: number;

  constructor(
    private flowersService: FlowersService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.allCat = this.flowersService.getAllCategories();
    this.selectCategory(this.allCat[0].id);
  }

  getArrayNumber(catid: number){
    return Array(catid).fill(0).map((x,i)=>i);
  }

  selectCategory(catId: number){
    this.currentCat = catId;
    this.router.navigate(['/shop', catId]);
  }

}
