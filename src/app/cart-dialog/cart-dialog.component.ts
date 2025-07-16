import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectedCustomerService } from '../customers/customers.service';
import { Cart } from '../cart/cart.model';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent implements OnInit {
  itemName: string;
  Price: number; // Matches database field name
  description: string;
  categoryID: number;
  ItemImage: string; // Matches database field name
  productQuantity: number = 1;
  public customerNo: number | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private selectedCustomerService: SelectedCustomerService, 
    private cartService: CartService
  ) {
    // Initialize component properties with data received from the dialog
    this.itemName = data.itemName;
    this.Price = data.Price; // Matches database field name
    this.description = data.description;
    this.categoryID = data.categoryID;
    this.ItemImage = data.ItemImage; // Matches database field name

    if (!data.customerId) {
      alert('No customer is selected');
    }
  }

  ngOnInit(): void {
    // Retrieve customer ID from the service
    this.customerNo = this.selectedCustomerService.getCustomerId();
  }

  addToCart(): void {
    if (this.customerNo === null) {
      alert('No customer selected');
      console.error('No customer selected');
      return;
    }

    const cartItem: Cart = {
      customerNo: this.customerNo,
      itemNo: this.data.itemNo, // Ensure that itemNo is part of the data passed
      itemName: this.itemName,
      ItemImage: this.ItemImage, // Matches database field name
      quantity: this.productQuantity,
      price: this.Price, // Matches database field name
      total: this.Price * this.productQuantity // Matches database field name
    };

    // Call the service to add the item to the cart
    this.cartService.addToCart(cartItem, this.customerNo, this.productQuantity);

    console.log('Item added to cart:', cartItem);
  }

  quantity(action: string): void {
    if (action === 'min' && this.productQuantity > 1) {
      this.productQuantity--;
    } else if (action === 'max') {
      this.productQuantity++;
    }
  }
}
