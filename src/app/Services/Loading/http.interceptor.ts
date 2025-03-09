import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequests = 0; // Track active HTTP requests

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.activeRequests === 0) {
      this.loadingService.show(); // Show loader only if no other requests are active
    }

    this.activeRequests++; // Increase request count

    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--; // Decrease request count

        if (this.activeRequests === 0) {
          this.loadingService.hide(); // Hide loader only when all requests complete
        }
      })
    );
  }
}
