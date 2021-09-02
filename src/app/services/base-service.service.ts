import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CommonMethods } from '../util/common';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root',
})
export class BaseServiceService {
  private baseUrl: string;
  private actionUrl: string;

  constructor(
    private http: HttpClient,
    private config: AppConfig,
    public commonMethods: CommonMethods,
    private cookieService: CookieService
  ) {
    this.baseUrl = this.config.apiUrl;
  }

  public getAll<T>(): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}${this.actionUrl}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  public getAllPaginate<T>(pageNumber = 0): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}${this.actionUrl}?PageNumber=${pageNumber}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  public getById<T>(id: string): Observable<T> {
    const cookieValue = this.cookieService.get('SESSIONID');
    console.log('cookieValue: ', cookieValue);
    const allCookies = this.cookieService.getAll();
    console.log('allCookies: ', allCookies);
    return this.http
      .get<T>(`${this.baseUrl}${this.actionUrl}${id}/`)
      .pipe(retry(3), catchError(this.handleError));
  }

  public post<T>(input: any, parameters = ''): Observable<T> {
    console.log('URL: ', `${this.baseUrl}${this.actionUrl}${parameters}`);

    return this.http
      .post<T>(`${this.baseUrl}${this.actionUrl}${parameters}`, input)
      .pipe(catchError(this.handleError));
  }

  public update<T>(id: string, data: any): Observable<T> {
    // const data = JSON.stringify(itemToUpdate);

    return this.http
      .patch<T>(`${this.baseUrl}${this.actionUrl}${id}`, data)
      .pipe(catchError(this.handleError));
  }

  public updateWithQueryString<T>(data: any): Observable<T> {
    return this.http
      .patch<T>(
        `${this.baseUrl}${this.actionUrl}${this.actionUrl}${data}`,
        data
      )
      .pipe(catchError(this.handleError));
  }

  public delete<T>(id: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}${this.actionUrl}${id}`)
      .pipe(catchError(this.handleError));
  }

  public setActionUrl(actionUrl: string, path = '') {
    this.actionUrl = `${actionUrl}${path}`;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      return throwError(error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error);
      return throwError(error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
