import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlowersService {

  flowers = [
    {name: "Fiesta Bouquet", price: 60, imgSrc: "assets/home/flower1.jpeg", description: "neki opis"},
    {name: "Alluring Elegance Bouquet", price: 72, imgSrc: "assets/home/flower2.jpeg", description: "neki opis"},
    {name: "Beyound Blue Bouquet", price: 55, imgSrc: "assets/home/flower3.jpeg", description: "neki opis"},
    {name: "Mixed Roses", price: 35, imgSrc: "assets/home/flower4.jpeg", description: "neki opis"},
    {name: "Belle of the Ball Bouquet", price: 45, imgSrc: "assets/home/flower5.jpeg", description: "neki opis"},
    {name: "Rainbow Garden", price: 50, imgSrc: "assets/home/flower6.jpeg", description: "neki opis"},
    {name: "Best Day Bouquet", price: 61, imgSrc: "assets/home/flower7.jpeg", description: "neki opis"},
    {name: "Smiles & Sunshine", price: 45, imgSrc: "assets/home/flower8.jpeg", description: "neki opis"}
  ];

  constructor() { }
}
