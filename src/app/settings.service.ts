import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Address } from './address';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private addressUrl = 'http://localhost:8083/baseAddress';
  private timesUrl = 'http://localhost:8083/deliveryTimes';

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

  updateAddress(address: Address): Observable<Address> {
    return this.http.put<Address>(this.addressUrl, address, httpOptions)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }

  updateTimes(times: any): Observable<any> {
    return this.http.put<any>(this.timesUrl, times, httpOptions)
    .pipe(
      retry(3),
      catchError(err => throwError(new Error('')))
    );
  }
}
