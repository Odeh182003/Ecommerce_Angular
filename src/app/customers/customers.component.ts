// customers.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from './customer.service';
import { CutomerUpdateComponent } from '../cutomer-update/cutomer-update.component';
import { customers } from './customers.model';
import {SelectedCustomerService} from './customers.service';
import { Router } from '@angular/router'; // Import Router
import { CartService } from '../service/cart.service'; // Import CartService

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: customers[] = [];
  filteredCustomers: customers[] = [];
  searchTerm: string = '';

  @Output() customerSelected = new EventEmitter<number>();  // Event emitter to pass customer ID

  constructor(private http: HttpClient, public dialog: MatDialog, private customerService: CustomerService, private selectedCustomerService: SelectedCustomerService,private router: Router // Inject Router
  ) {}

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): void {
    this.http.get<customers[]>('http://localhost/public_html/salesManProject/salesmanAdvanced.php')
      .subscribe(data => {
        this.customers = data;
        this.filteredCustomers = data;
      }, error => {
        console.error('Error fetching customer data', error);
      });
  }

  handleCustomerSelected(customerID: number): void {
    this.selectedCustomerService.setCustomerId(customerID); // Store the selected customerID
    console.log('Selected Customer ID:', customerID);
    this.router.navigate(['/items']); // Navigate to the Items page
  }

  openDialog(customer?: customers): void {
    const dialogRef = this.dialog.open(CutomerUpdateComponent, {
      width: '400px',
      data: customer || {} // Pass customer data if editing, or an empty object if adding
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (customer) {
          this.updateCustomer(customer.CustomerID, result);
        } else {
          this.addCustomer(result);
        }
      }
    });
  }

  addCustomer(customerData: any): void {
    this.http.post('http://localhost/public_html/salesManProject/salesmanAdvanced.php', customerData)
      .subscribe(() => {
        this.getCustomers(); // Refresh the table after adding
      }, error => {
        console.error('Error adding customer', error);
      });
  }

  updateCustomer(customerID: number, customerData: any): void {
    this.http.put(`http://localhost/public_html/salesManProject/salesmanAdvanced.php/${customerID}`, customerData)
      .subscribe(() => {
        this.getCustomers(); // Refresh the table after updating
      }, error => {
        console.error('Error updating customer', error);
      });
  }

  removeItem(customer: customers): void {
    this.http.delete(`http://localhost/public_html/salesManProject/salesmanAdvanced.php/${customer.CustomerID}`)
      .subscribe(() => {
        this.getCustomers(); // Refresh the table after removing
      }, error => {
        console.error('Error deleting customer', error);
      });
  }

  filterCustomers(): void {
    this.filteredCustomers = this.customers.filter(customer =>
      customer.CustomerName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  
 
}
