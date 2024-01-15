import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SocialSidebarComponent } from './social-sidebar/social-sidebar.component';
import { FlowersService } from './services/flowers.service';
import { ShopComponent } from './shop/shop.component';
import { CategoryComponent } from './shop/category/category.component';
import { ProductComponent } from './shop/product/product.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingCartService } from './services/shopping-cart.service';
import { SnackBarService } from './services/snack-bar.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductOrderComponent } from './product-order/product-order.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SocialSidebarComponent,
    ShopComponent,
    CategoryComponent,
    ProductComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    ShoppingCartComponent,
    ProductOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [ FlowersService, ShoppingCartService, SnackBarService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
