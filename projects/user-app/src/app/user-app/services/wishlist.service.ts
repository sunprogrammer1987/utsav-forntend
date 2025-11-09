import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private storageKey = 'wishlist';
  private _items = new BehaviorSubject<Product[]>(this.load());
  items$ = this._items.asObservable();

  private load(): Product[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private save(items: Product[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  add(item: Product) {
    const items = this._items.getValue();
    if (!items.find(p => p.id === item.id)) {
      const updated = [...items, item];
      this._items.next(updated);
      this.save(updated);
    }
  }

  remove(id: string) {
    const updated = this._items.getValue().filter(p => p.id !== id);
    this._items.next(updated);
    this.save(updated);
  }

  clear() {
    this._items.next([]);
    this.save([]);
  }

  isInWishlist(id: string): boolean {
    return this._items.getValue().some(p => p.id === id);
  }
}
