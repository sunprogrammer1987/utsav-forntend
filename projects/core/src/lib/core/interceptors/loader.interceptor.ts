import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from 'projects/user-app/src/app/user-app/services/loader.service';
import { ProgressBarService } from 'projects/user-app/src/app/user-app/services/progress-bar.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(
    private loader: LoaderService,
    private progress: ProgressBarService
  ) {}

  private removeRequest(req: HttpRequest<any>) {
    const index = this.requests.indexOf(req);
    if (index >= 0) this.requests.splice(index, 1);
    if (this.requests.length === 0) {
      this.loader.hide();
      this.progress.complete();
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.requests.length === 0) {
      this.loader.show();
      this.progress.start();
    }
    this.requests.push(req);

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) this.removeRequest(req);
        },
        error: () => this.removeRequest(req)
      }),
      finalize(() => {
        if (this.requests.length === 0) {
          this.loader.hide();
          this.progress.complete();
        }
      })
    );
  }
}
