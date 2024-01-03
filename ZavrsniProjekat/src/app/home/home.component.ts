import { Component, OnInit } from '@angular/core';
import { FlowersService } from '../services/flowers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  flowersHome: {name: string, price: number, imgSrc: string}[] = [];

  constructor(
    private flowersService : FlowersService,
    private router : Router
    ) {}

  ngOnInit() {
    this.flowersHome = this.flowersService.flowersHome;
  }

  loadShop() {
    this.router.navigate(['/shop']);
  }
}
