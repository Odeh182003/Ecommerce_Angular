import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
products: any[] = [];
  constructor(private http : HttpClient) { }
  getItemDetails(itemNo: number) {
    return this.http.get(`http://localhost/public_html/salesManProject/getItemDetails.php?itemNo=${itemNo}`)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getProduct(){
    return this.http.get('http://localhost/public_html/salesManProject/salesmanAdvancedItem.php')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getProducts(){
    return this.products;
  }
  saveCart(){
    localStorage.setItem('cart_items', JSON.stringify(this.products))
  }
  addToCart(addedProduct: any){
    this.products.push(addedProduct);
    this.saveCart();
  }
  loadCart(){
    this.products = JSON.parse(localStorage.getItem('cart_items') as
  any) || [];
  }
  productInCart(product: any){
    return this.products.findIndex((x: any) => x.id == product.id) > -1
  }
  removeProduct(product : any){
    const index = this.products.findIndex((x: any) => x.id == product.id);
    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart()
    }
  }
  clearProducts(){
    localStorage.clear();
  }
}
