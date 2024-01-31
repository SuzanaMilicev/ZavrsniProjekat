import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/ProductCategory';
import { Product } from '../models/Product';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlowersService {

  flowersHome = [
    {name: "Fiesta Bouquet", price: 60, imgSrc: "assets/home/flower1.jpeg"},
    {name: "Alluring Elegance Bouquet", price: 72, imgSrc: "assets/home/flower2.jpeg"},
    {name: "Beyound Blue Bouquet", price: 55, imgSrc: "assets/home/flower3.jpeg"},
    {name: "Mixed Roses", price: 35, imgSrc: "assets/home/flower4.jpeg"},
    {name: "Belle of the Ball Bouquet", price: 45, imgSrc: "assets/home/flower5.jpeg"},
    {name: "Rainbow Garden", price: 50, imgSrc: "assets/home/flower6.jpeg"},
    {name: "Best Day Bouquet", price: 61, imgSrc: "assets/home/flower7.jpeg"},
    {name: "Smiles & Sunshine", price: 45, imgSrc: "assets/home/flower8.jpeg"}
  ];

  productCategories = [
    new ProductCategory(1, "Sympathy", "assets/category/category1.png"),
    new ProductCategory(2, "Anniversary", "assets/category/category2.png"),
    new ProductCategory(3, "Congratulations", "assets/category/category3.png"),
    new ProductCategory(4, "Get Well", "assets/category/category4.png")
  ];

  constructor(
    private httpClient: HttpClient
  ) { }

  getProductsByCategory(cat: number){
    return this.httpClient.get("http://localhost:3000/products")
    .pipe(
      map(
        (products: any) => {
          let products2 = products as Product[];
          return products2.filter(x => x.catId == cat);
        }
      )
    )
  }

  getAllCategories(){
    return this.productCategories;
  }

  getProductById(catId: number){
    return this.httpClient.get("http://localhost:3000/products/" + catId)
    .pipe(
      map(
        (product) => {
          return product as Product;
        }
      )
    )
  }

  getPrevProduct(currentProductId: number){
    return this.httpClient.get("http://localhost:3000/products")
    .pipe(
      map(
        (products: any) => {
          let products2 = products as Product[];
          let currentIndex = products2.findIndex(x => x.id == currentProductId);
          if (currentIndex == 0) {
            return products2[products2.length - 1];
          }
          else {
            return products2[currentIndex - 1];
          }
        }
      )
    )
  }

  getNextProduct(currentProductId: number){
    return this.httpClient.get("http://localhost:3000/products")
    .pipe(
      map(
        (products: any) => {
          let products2 = products as Product[];
          let currentIndex = products2.findIndex(x => x.id == currentProductId);
          if (currentIndex == products2.length - 1) {
            return products2[0];
          }
          else {
            return products2[currentIndex + 1];
          }
        }
      )
    )
  }
}
