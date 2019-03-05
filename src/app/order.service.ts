import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Product } from './product';
import { Order } from './order';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'http://localhost:8082/orders';

  orderItems: Product[] = [];

  constructor( private http: HttpClient ) { }

  getCurrentOrderItems(): Product[] {
    return this.orderItems;
  }

  setCurrentOrderItems(products: Product[]): void {
    this.orderItems = products;
  }

  getCurrentOrderTotal(): number {
    return this.orderItems.reduce((partial, actual) => partial + actual.price, 0);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }

  getDeliveredOrders(): Observable<Order[]> {
    const url = `${this.ordersUrl}?delivered=true`;
    return this.http.get<Order[]>(url)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }

  getOrdersToDeliver(): Observable<Order[]> {
    const url = `${this.ordersUrl}?delivered=false`;
    return this.http.get<Order[]>(url)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, order, httpOptions)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }

  updateOrder(order: Order): Observable<Order> {
    const url = `${this.ordersUrl}/${order.id}`;
    return this.http.put<Order>(url, order, httpOptions)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }
}
