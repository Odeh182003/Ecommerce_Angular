import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms'; 
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { ApiService } from './service/api.service'; // Adjust path as needed
import { FilterService } from './service/filter.service'; // Adjust path as needed

import { CutomerUpdateComponent } from './cutomer-update/cutomer-update.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CartComponent } from './cart/cart.component';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CutomerUpdateComponent,
    LoginComponent,
    HeaderComponent,
    ProductsComponent,
    HomeComponent,
    CartComponent,
    CartDialogComponent,
    ItemDetailsComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, // Add this line
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    RouterModule,
    
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [ApiService, FilterService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
