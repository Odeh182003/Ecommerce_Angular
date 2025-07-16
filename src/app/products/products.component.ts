// products.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FilterService } from '../service/filter.service';
import { CartService } from '../service/cart.service';
import { Cart } from '../cart/cart.model';
import { debounceTime } from 'rxjs/operators';
import { CustomersComponent } from '../customers/customers.component';
import {SelectedCustomerService} from '../customers/customers.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productList: any[] = [];
  public filteredProductList: any[] = [];
  public productQuantity: number = 1;
  public customerNo: number | null = null;


  constructor(
    private api: ApiService,
    private filterService: FilterService,
    private selectedCustomerService: SelectedCustomerService,
    private cartService: CartService,
    private router: Router
  ) {}
  viewDetails(itemNo: number): void {
    this.router.navigate(['/item-details', itemNo]);
  }
  ngOnInit(): void {
    // Retrieve customer ID from the service
    this.customerNo = this.selectedCustomerService.getCustomerId();

    // Fetch product list from the API
    this.api.getProduct().subscribe(res => {
      this.productList = res;
      this.filteredProductList = res;

      // Initialize product quantity and total for each product
      this.productList.forEach((product: any) => {
        product.quantity = 1;
        product.total = product.Price * 1;
      });
    });

    // Filter products based on the search term
    this.filterService.searchTerm$
      .pipe(debounceTime(300))
      .subscribe(searchTerm => {
        this.filteredProductList = this.productList.filter(product =>
          product.ItemName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  }

 
}
