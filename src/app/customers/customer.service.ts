import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost/public_html/salesManProject/salesmanAdvanced.php';

  constructor(private http: HttpClient) { }
  private customerId!: number;

  setCustomerId(id: number): void {
    this.customerId = id;
  }

  getCustomerId(): number {
    return this.customerId;
  }
  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
