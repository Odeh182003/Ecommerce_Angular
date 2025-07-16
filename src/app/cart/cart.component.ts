import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { OrderService } from '../service/order.service';
import { Cart } from './cart.model';
import { HttpClient } from '@angular/common/http';
import { SelectedCustomerService } from '../customers/customers.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products: Cart[] = [];
  public grandTotal!: number;
  public selectedCustomerID!: number | null;

  constructor(
    private cartService: CartService,
    private ordersService: OrderService,
    private http: HttpClient,
    private selectedCustomerService: SelectedCustomerService
  ) {}

  ngOnInit(): void {
    this.selectedCustomerID = this.selectedCustomerService.getCustomerId();
    if (this.selectedCustomerID) {
      this.loadCartItems();
    } else {
      console.error('No customer selected');
    }
  }

  loadCartItems() {
    if (this.selectedCustomerID !== null) {
      this.cartService.getProductsByCustomer(this.selectedCustomerID).subscribe((res: Cart[]) => {
        this.products = res.map(item => ({
          ...item,
          ItemImage: item.ItemImage || 'default_image_path',
          itemName: item.itemName || 'Unknown Item'
        }));
        this.calculateGrandTotal();
      });
    }
  }

  calculateGrandTotal() {
    this.grandTotal = this.products.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  removeItems(item: Cart) {
    this.cartService.removeCartItems(item).subscribe(() => {
      this.loadCartItems();  // Refresh the cart after removal
    });
  }

  emptyCart() {
    this.cartService.removeAllCart().subscribe(() => {
      this.loadCartItems();  // Refresh the cart after emptying
    });
  }

  checkout() {
    this.ordersService.createOrder(this.products).subscribe({
      next: response => {
        alert('Checkout successful!');
        this.emptyCart();
      },
      error: err => {
        alert('Checkout failed!');
        console.error('Error during checkout:', err);
      }
    });
  }

  getImageUrl(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }
}
