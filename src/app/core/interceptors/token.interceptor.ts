import { Injectable, Injector } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authService = this.injector.get(AuthService);
    return next.handle(request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authService.getToken()}`)
    }));
  }
}
