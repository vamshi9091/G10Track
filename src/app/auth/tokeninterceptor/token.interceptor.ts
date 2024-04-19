import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return next.handle(request);
    const authToken = this.authService.getToken();

    // Clone the original request and add the authorization header.
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    // Pass the request to the next handler.
    // return next.handle(request).pipe(
    //   catchError((err:any)=>{
    //     if (err instanceof HttpErrorResponse){
    //       if(err.status===401){
    //         // this.toastr.warning({detail:"warning",summary:"Token is expired,Login"});
    //       }
    //     }
    //     return throwError(()=>new Error("some other error ocured"))
    //   })
    // );

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.toastr.error('Token is expired or invalid. Please login again.', 'Authentication Error');
            // You might want to navigate the user to the login page here
          } else {
            console.error('HTTP error occurred:', error.message);
            // Log the full error object for debugging
            console.error('Full error:', error);
          }
        } else {
          console.error('An error occurred:', error.message);
          // Log the full error object for debugging
          console.error('Full error:', error);
        }
        // Pass the error along to the caller
        return throwError(error);
      })
    );
  }
}
