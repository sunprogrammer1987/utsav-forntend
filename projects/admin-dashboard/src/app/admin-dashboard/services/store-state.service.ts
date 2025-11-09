import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StoreStateService {
  private storeSubject = new BehaviorSubject<string>(
    localStorage.getItem('admin_active_store') || 'all'
  );
  store$ = this.storeSubject.asObservable();

  setActiveStore(storeId: string) {
    localStorage.setItem('admin_active_store', storeId);
    this.storeSubject.next(storeId);
  }

  getActiveStore() {
    return this.storeSubject.value;
  }
}
