import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../user-data';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  authToken: string;
  constructor(private userData: UserData) {
    this.getLoginToken();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', this.authToken),
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }

  async getLoginToken() {
    this.authToken = await this.userData.getAuthorizationToken();
  }
}
