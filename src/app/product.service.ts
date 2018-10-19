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
export class ProductService {
  private productsUrl = 'http://localhost:3000/products';
  private baseUrl = 'http://localhost:3000/categories';

  constructor( private http: HttpClient ) { }

  getProductsByCategory(id: number): Observable<Product[]> {
    const url = `${this.baseUrl}/${id}/products`;
    return this.http.get<Product[]>(url)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }

  addProduct (product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, httpOptions)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }
}
