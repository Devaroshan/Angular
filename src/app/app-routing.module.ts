import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BooksComponent } from './books/books.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CartComponent } from './cart/cart.component';
import { DetailsComponent } from './details/details.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { LoginComponent } from './login/login.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'books',component:BooksComponent,canActivate:[AuthGuard]},
  {path:'Details/:id',component:DetailsComponent,canActivate:[AuthGuard]},
  {path:'Cart',component:CartComponent,canActivate:[AuthGuard]},
  {path:'Cart-Details/:id',component:CartDetailsComponent,canActivate:[AuthGuard]},
  {path:'History',component:PurchaseHistoryComponent,canActivate:[AuthGuard]},
  {path:'Fav',component:FavouriteComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
