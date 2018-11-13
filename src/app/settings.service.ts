import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Address } from './address';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private addressUrl = '../assets/config/baseAddress.json';
  private timesUrl = '../assets/config/deliveryTimes.json';

  constructor( private http: HttpClient ) { }

  getAddress(): Observable<Address> {
    return this.http.get<Address>(this.addressUrl)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }

  getTimes(): Observable<any> {
    return this.http.get<any>(this.timesUrl)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }
}
