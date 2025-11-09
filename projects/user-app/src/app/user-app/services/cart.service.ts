import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models';


@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = new BehaviorSubject<Product[]>([]);
  items$ = this._items.asObservable();


  add(item: Product) {
    const current = this._items.getValue();
    this._items.next([...current, item]);
  }


  remove(id: string) {
    this._items.next(this._items.getValue().filter(i => i.id !== id));
  }


  clear() {
    this._items.next([]);
  }
}