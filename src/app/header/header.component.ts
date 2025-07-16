import { Component, OnInit } from '@angular/core';
import { FilterService } from '../service/filter.service';
import { CartService } from '../service/cart.service';
import { Cart } from '../cart/cart.model'; // Adjust path if needed

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  public totalItem: number = 0;
  

  constructor(
    private filterService: FilterService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((res: Cart[]) => {
      this.totalItem = res.length;
    });
  }

  filterItems(): void {
    this.filterService.setSearchTerm(this.searchTerm);
    console.log(this.searchTerm);
  }

  
}
