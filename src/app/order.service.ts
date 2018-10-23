import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Product } from './product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private productsUrl = 'http://localhost:3000/products';
  private baseUrl = 'http://localhost:3000/categories';

  orderItems: Product[] = [];

  constructor( private http: HttpClient ) { }

  getOrderItems(): Product[] {
    return this.orderItems;
  }

  setOrderItems(products: Product[]): void {
    this.orderItems = products;
  }

  getTotal(): number {
    return this.orderItems.reduce((partial, actual) => partial + actual.price, 0);
  }
}
