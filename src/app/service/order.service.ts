import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../cart/cart.model'; // Assuming Cart model is used

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost/public_html/salesManProject/checkout.php';

  constructor(private http: HttpClient) {}

  createOrder(cartItems: Cart[]): Observable<any> {
    return this.http.post(this.apiUrl, {}, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
