// selected-customer.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedCustomerService {
  private customerId: number | null = null;

  setCustomerId(id: number): void {
    this.customerId = id;
  }

  getCustomerId(): number | null {
    return this.customerId;
  }
}
