import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Product } from './product';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://localhost:8081/products';
  private baseUrl = 'http://localhost:8080/categories';

  constructor( private http: HttpClient ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }

  getProductsByCategory(id: string): Observable<Product[]> {
    const url = `http://localhost:8081/categories/${id}/products`;
    return this.http.get<Product[]>(url)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, httpOptions)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }

  deleteProduct(product: Product): Observable<Product> {
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.delete<Product>(url, httpOptions)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }
}
