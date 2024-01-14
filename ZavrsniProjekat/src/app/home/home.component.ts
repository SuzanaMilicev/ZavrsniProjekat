import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FlowersService } from '../services/flowers.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  @ViewChild("contactForm") contactForm!: NgForm;
  flowersHome: { name: string, price: number, imgSrc: string }[] = [];

  constructor(
    private flowersService: FlowersService,
    private router: Router,
    private mySnackBar: SnackBarService
  ) { }

  ngOnInit() {
    this.flowersHome = this.flowersService.flowersHome;
  }

  loadShop() {
    this.router.navigate(['/shop']);
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.contactForm.reset();
    this.mySnackBar.openSnackBar("Thank you for your message! We will contact you as soon as possible.");
  }

  newsletter(newsletterValue: {
    reset(): unknown; valid: any;
  }) {
    if (newsletterValue.valid) {
      console.log(newsletterValue);
      newsletterValue.reset();
      this.mySnackBar.openSnackBar("Thank you for subscribing to our newsletter!");
    }
  }
}
