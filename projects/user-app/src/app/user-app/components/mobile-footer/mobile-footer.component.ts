import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-mobile-footer',
  templateUrl: './mobile-footer.component.html'
})
export class MobileFooterComponent {
  cartCount = 0;
  isHidden = false;
  showQuickActions = false;
  private lastScrollTop = 0;

  constructor(private cart: CartService, private router: Router) {
    this.cart.items$.subscribe(items => (this.cartCount = items.length));
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop + 20) this.isHidden = true;
    else if (st < this.lastScrollTop - 20) this.isHidden = false;
    this.lastScrollTop = Math.max(st, 0);
  }

  toggleQuickActions() {
    this.showQuickActions = !this.showQuickActions;
  }

  navigate(path: string) {
    this.toggleQuickActions();
    this.router.navigate([path]);
  }

  navigateToProducts(type: string) {
    this.toggleQuickActions();
    this.router.navigate(['/products'], { queryParams: { type } });
  }

}
