import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StoreStateService {
  private storeSubject = new BehaviorSubject<string>(localStorage.getItem('vendor_active_store') || 'all');
  store$ = this.storeSubject.asObservable();

  setActiveStore(storeId: string) {
    localStorage.setItem('vendor_active_store', storeId);
    this.storeSubject.next(storeId);
  }

  getActiveStore() {
    return this.storeSubject.value;
  }
}
