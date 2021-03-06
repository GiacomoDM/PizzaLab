import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Category } from './category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesUrl = 'http://localhost:8080/categories';

  constructor( private http: HttpClient ) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, httpOptions)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }

  deleteCategory(category: Category): Observable<Category> {
    const url = `${this.categoriesUrl}/${category.id}`;
    return this.http.delete<Category>(url, httpOptions)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }
}
