import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .catch((errorResponse: HttpErrorResponse | any) => {
        let errMsg: string;
        if (errorResponse instanceof HttpErrorResponse) {
          const err =
            errorResponse.message || JSON.stringify(errorResponse.error);
          errMsg = `${errorResponse.status} - ${errorResponse.statusText ||
            ''}. Details: ${err}`;
        } else {
          errMsg = errorResponse.message
            ? errorResponse.message
            : errorResponse.toString();
        }
        return _throw(errMsg);
      });
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
