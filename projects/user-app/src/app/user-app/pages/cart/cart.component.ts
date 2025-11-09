
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  items: any[] = [];
  subtotal = 0;

  constructor(private cartSvc: CartService) {}

  ngOnInit() {
    this.cartSvc.items$.subscribe(items => {
      this.items = items;
      this.recalculateSubtotal();
    });
  }

  remove(id: string) {
    this.cartSvc.remove(id);
    this.recalculateSubtotal();
  }

  updateQuantity(it: any, change: number) {
    it.quantity = Math.max(1, (it.quantity || 1) + change);
    this.recalculateSubtotal();
  }

  recalculateSubtotal() {
    this.subtotal = this.items.reduce(
      (acc, it) => acc + (it.price * (it.quantity || 1)),
      0
    );
  }
}
