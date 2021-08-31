/* eslint-disable @typescript-eslint/naming-convention */
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { AuthDataModel } from '../models/UserModel';
import { UserData } from '../user-data';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  authToken = '';
  authData: AuthDataModel;

  constructor(private userData: UserData) {
    this.getLoginToken();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();

    let ok: string;
    // Get the auth token from the service.

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    console.log('this.authData: ', this.authData);

    const authReq = req.clone({
      setHeaders: {
        // eslint-disable-next-line max-len
        Cookie: `SessionID=s%3A28be3513-31c0-4027-9361-af044bbe5a05.eniKVmaoQQUHmHBOVkelNnVUpX%2FfWFXvSBxNe6%2BtTGg`,
      },
    });

    console.log('authReq: ', authReq);

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        (event) => {
          if (event instanceof HttpResponse) {
            ok = event instanceof HttpResponse ? 'succeeded' : '';
            console.log(' Response event:', event.headers);
            console.log('Headers: ', event.headers.get('Set-Cookies'));
          }
        },
        // Operation failed; error is an HttpErrorResponse
        (error) => {
          ok = 'failed';
          console.log(' next.handle error:', error);
        }
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
        console.log('msg: ', msg);
      })
    );
  }

  async getLoginToken() {
    this.authData = await this.userData.getAuthorizationData();
  }
}
