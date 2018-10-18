import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Category } from './category';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesUrl = 'http://localhost:3000/categories';

  constructor( private http: HttpClient ) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }
}
