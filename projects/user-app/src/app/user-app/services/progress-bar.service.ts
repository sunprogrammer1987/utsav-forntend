import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProgressBarService {
  progress$ = new BehaviorSubject<number>(0);
  private timer?: Subscription;

  start() {
    this.stop();
    this.progress$.next(10);
    this.timer = interval(200).subscribe(() => {
      const current = this.progress$.value;
      if (current < 90) this.progress$.next(current + Math.random() * 10);
    });
  }

  complete() {
    this.progress$.next(100);
    setTimeout(() => this.reset(), 400);
  }

  reset() {
    this.stop();
    this.progress$.next(0);
  }

  private stop() {
    if (this.timer) {
      this.timer.unsubscribe();
      this.timer = undefined;
    }
  }
}
