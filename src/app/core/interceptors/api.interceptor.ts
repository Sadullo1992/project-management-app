import { Injectable } from '@angular/core';
declare let alertify: any;
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {


  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('i18n')) return next.handle(request);

    return next.handle(request.clone({
      url: `${environment.API_URL}${request.url}`
    })).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    alertify.set('notifier','position', 'top-right');
    if (error.status === 0) {
      alertify.error('Please, check internet connetion, Something went wrong!')
    } else {
      if(error.status === 403) {
        alertify.error('User login or password is wrong!');
      } else {
        alertify.error(error.error.message.toString())
      }
    }
    return throwError(() => error);
  }
}
