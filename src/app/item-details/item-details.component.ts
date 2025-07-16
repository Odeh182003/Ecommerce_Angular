import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { CartService } from '../service/cart.service';
import { Cart } from '../cart/cart.model';
import { SelectedCustomerService } from '../customers/customers.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'] // Note the correction to 'styleUrls'
})
export class ItemDetailsComponent implements OnInit {
  public item: any = {};
  public productQuantity: number = 1;
  public customerNo: number | null = null;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private selectedCustomerService: SelectedCustomerService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Retrieve customer ID from the service
    this.customerNo = this.selectedCustomerService.getCustomerId();

    // Get itemNo from the route parameters
    const itemNoString = this.route.snapshot.paramMap.get('itemNo');
    const itemNo = itemNoString ? parseInt(itemNoString, 10) : null;

    // Fetch details for the selected item
    if (itemNo !== null) {
      this.api.getItemDetails(itemNo).subscribe(
        (res) => {
          console.log('Item Details:', res);
          this.item = res;
          this.productQuantity = 1; // Initialize quantity
        },
        (error) => {
          console.error('Error fetching item details:', error);
        }
      );
    }
    
  }

  quantity(value: string) {
    if (value === 'max') {
      this.productQuantity += 1;
    } else if (value === 'min' && this.productQuantity > 1) {
      this.productQuantity -= 1;
    }
  }

  addToCart(): void {
    if (this.customerNo === null) {
        alert('No customer selected');
        console.error('No customer selected');
        return;
    }

    // Ensure item details are correctly populated
    const cartItem: Cart = {
        customerNo: this.customerNo,
        itemNo: this.item.itemNo,  // Check if 'itemNo' is correctly retrieved
        itemName: this.item.itemName,  // Check if 'itemName' is correctly retrieved
        ItemImage: this.item.ItemImage,
        quantity: this.productQuantity,
        price: this.item.Price,
        total: this.item.Price * this.productQuantity
    };

    // Call the service to add the item to the cart
    this.cartService.addToCart(cartItem, this.customerNo, this.productQuantity)
        .subscribe(
            (response) => {
                console.log('Item added to cart:', response);
            },
            (error) => {
                console.error('Error adding to cart:', error);
            }
        );
}
getImageUrl(base64String: string): string {
  return `data:image/jpeg;base64,${base64String}`;
}
}
