// customer.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerIdSource = new BehaviorSubject<number | null>(null);
  currentCustomerId = this.customerIdSource.asObservable();

  setCustomerId(CustomerID: number): void {
    this.customerIdSource.next(CustomerID);
    console.log('Customer ID set to:', CustomerID); // Debugging line
  }

}
