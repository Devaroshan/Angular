import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { RegisterComponent } from './register/register.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { FavouriteComponent } from './favourite/favourite.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    DetailsComponent,
    HomeComponent,
    LoginComponent,
    CartComponent,
    PurchaseHistoryComponent,
    RegisterComponent,
    CartDetailsComponent,
    FavouriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
