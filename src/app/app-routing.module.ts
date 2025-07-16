import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
//import { ItemUpdateDialogComponent } from './item-update-dialog/item-update-dialog.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ItemDetailsComponent } from './item-details/item-details.component'; // Import the new component

import { ProductsComponent } from './products/products.component'; // Adjust path as needed
import {CartComponent} from './cart/cart.component';
const routes: Routes = [
  { path: 'items', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'item-details/:itemNo', component: ItemDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
