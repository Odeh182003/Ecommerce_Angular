import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../cart/cart.model'; // Adjust the import path as needed
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemList: Cart[] = [];
  private productList = new BehaviorSubject<Cart[]>([]);
  private apiUrl = 'http://localhost/public_html/salesManProject/addToCart.php';

  constructor(private http: HttpClient) {}

  // Fetch products based on the selected customer ID
  getProductsByCustomer(customerID: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}?customerID=${customerID}`).pipe(
      tap((res: Cart[]) => {
        this.cartItemList = res;
        this.productList.next(this.cartItemList);
      })
    );
  }

  // Add item to the cart
  addToCart(product: any, customerNo: number, selectedQuantity: number): Observable<any> {
    const cartItem: Cart = {
      customerNo: customerNo,
      itemNo: product.itemNo,
      itemName: product.itemName,
      ItemImage: product.ItemImage,
      quantity: selectedQuantity,
      price: product.price,
      total: product.price * selectedQuantity
    };

    return this.http.post<any>(`${this.apiUrl}?action=addToCart`, JSON.stringify(cartItem), {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap((response: any) => {
        if (response && response.message) {
          this.cartItemList.push(cartItem);
          this.productList.next(this.cartItemList);
        } else {
          console.error('Unexpected server response:', response);
        }
      })
    );
  }

  // Calculate the total price of items in the cart
  getTotalPrice(): number {
    return this.cartItemList.reduce((grandTotal, item) => grandTotal + item.price * item.quantity, 0);
  }

  // Remove a single item from the cart
  removeCartItems(product: Cart): Observable<any> {
    if (product.id) {
      const url = `http://localhost/public_html/salesManProject/addToCart.php?id=${product.id}`;
      return this.http.delete(url, {
        headers: { 'Content-Type': 'application/json' }
      }).pipe(
        tap((response: any) => {
          if (response && response.message) {
            this.cartItemList = this.cartItemList.filter(item => item.id !== product.id);
            this.productList.next(this.cartItemList);
            console.log('Item removed successfully:', response.message);
          } else {
            console.error('Unexpected server response:', response);
          }
        })
      );
    } else {
      return new Observable(observer => {
        observer.error('Item ID is missing');
      });
    }
  }

  // Clear all items from the cart
  removeAllCart(): Observable<any> {
    const url = `${this.apiUrl}?action=clearCart`;
    return this.http.delete(url, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap((response: any) => {
        if (response && response.message) {
          this.cartItemList = [];
          this.productList.next(this.cartItemList);
          console.log('Cart cleared successfully:', response.message);
        } else {
          console.error('Unexpected server response:', response);
        }
      })
    );
  }

  // Observable for cart updates
  getCartItems(): Observable<Cart[]> {
    return this.productList.asObservable();
  }
  
}
