import { Component, OnInit } from '@angular/core';
import { FlowersService } from '../services/flowers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  flowers: {name: string, price: number, imgSrc: string, description: string}[] = [];

  constructor(
    private flowersService : FlowersService,
    private router : Router
    ) {}

  ngOnInit() {
    this.flowers = this.flowersService.flowers;
  }

  loadShop() {
    this.router.navigate(['/shop']);
  }
}
