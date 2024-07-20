import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.snackBar.open(`404 Error`, 'OK');
        } else if (error.status == 500) {
          this.snackBar.open(`Internal Server Error`, 'OK');
        } else if (!error.ok) {
          console.log('tes',error);
          this.snackBar.open(`Internal Server Error`, 'OK');
        }
        return throwError(error);
      }),
    );
  }
}