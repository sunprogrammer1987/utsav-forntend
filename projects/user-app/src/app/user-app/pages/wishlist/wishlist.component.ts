import { Component } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html'
})
export class WishlistComponent {
  items: Product[] = [];

  constructor(
    private wishlist: WishlistService,
    private cart: CartService,
    private toast: ToastService
  ) {
    this.wishlist.items$.subscribe(res => (this.items = res));
  }

  remove(id: string) {
    this.wishlist.remove(id);
    this.toast.info('❌ Removed from wishlist');
  }

  moveToCart(item: Product) {
    this.cart.add(item);
    this.wishlist.remove(item.id);
    this.toast.success('🛒 Moved to cart');
  }

  clearAll() {
    this.wishlist.clear();
    this.toast.warning('🧹 Wishlist cleared');
  }
}
