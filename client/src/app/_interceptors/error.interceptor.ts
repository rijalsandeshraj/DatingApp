import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e) {
        switch (e.status) {
          case 400:
            if (e.error.errors) {
              const modelStateErrors = [];
              for (const key in e.error.errors) {
                if (e.error.errors[key]) {
                  modelStateErrors.push(e.error.errors[key]);
                }
              }
              throw modelStateErrors.flat();
            } else {
              toastr.error(e.error, e.status.toString());
            }
            break;
          case 401:
            toastr.error('Unauthorized', e.status.toString());
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = {
              state: { error: e.error },
            };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toastr.error('Something went wrong');
            console.log(e);
            break;
        }
      }
      throw e;
    })
  );
};
