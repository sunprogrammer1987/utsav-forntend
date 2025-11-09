import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {
  // 🌙 Theme
  isDark = false;
  isHome = false; 
  // 📱 Mobile Menu
  mobileMenuOpen = false;
  userLocation: string = '';

  // 🔍 Search
  searchTerm = '';
  showSuggestions = false;
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  filteredCategories: string[] = [];
  filteredEvents: { name: string }[] = [];
  private searchSubject = new Subject<string>();

  // 🛒 Cart
  cartCount = 0;

  // 💨 Scroll Shadow
  scrolled = false;

  // 🧹 Subscriptions cleanup
  private subs: Subscription[] = [];

  constructor(
    private theme: ThemeService,
    private router: Router,
    private productSvc: ProductService,
    private cart: CartService
  ) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isHome = event.url === '/' || event.url === '/home';
      });

    navigator.geolocation.getCurrentPosition((pos) => {
      this.userLocation = 'Your City'; // Replace with reverse geocode API if needed
    });
    this.isDark = document.documentElement.classList.contains('dark');

    // 🧠 Debounced search
    const sub1 = this.searchSubject
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe(term => this.filterResults(term));
    this.subs.push(sub1);

    // 🛍 Load initial data
    this.loadProducts();
    this.loadCartCount();
  }

  // 🧩 Load all products for quick search
  loadProducts() {
    const sub = this.productSvc.getAll().subscribe({
      next: res => (this.allProducts = res || []),
      error: err => console.error('Failed to load products', err)
    });
    this.subs.push(sub);
  }

  // 🛒 Reactive cart count
  loadCartCount() {
    const sub = this.cart.items$.subscribe(items => (this.cartCount = items?.length || 0));
    this.subs.push(sub);
  }

  // 🌗 Toggle dark / light mode
  toggleTheme() {
    this.theme.toggleDarkMode();
    this.isDark = document.documentElement.classList.contains('dark');
  }

  // 📱 Mobile menu
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  // 🔍 Handle typing
  onSearchInput() {
    const term = this.searchTerm.trim();
    this.showSuggestions = !!term;
    this.searchSubject.next(term);
  }

  // 🔎 Filter products, categories, and events
  filterResults(term: string) {
    if (!term) {
      this.filteredProducts = [];
      this.filteredCategories = [];
      this.filteredEvents = [];
      return;
    }

    const lower = term.toLowerCase();

    // 🛒 Products
    this.filteredProducts = this.allProducts
      .filter(p => p.name.toLowerCase().includes(lower))
      .slice(0, 6);

    // 🗂 Categories
    this.filteredCategories = [
      ...new Set(this.allProducts.map(p => p.category))
    ]
      .filter(c => c && c.toLowerCase().includes(lower))
      .slice(0, 5);

    // 🎉 Events
    const sampleEvents = [
      { name: 'Wedding Decoration' },
      { name: 'Birthday Party' },
      { name: 'Corporate Event' },
      { name: 'Engagement Ceremony' },
      { name: 'Anniversary Celebration' }
    ];
    this.filteredEvents = sampleEvents.filter(e =>
      e.name.toLowerCase().includes(lower)
    );
  }

  // 🧠 Combined check
  get hasAnyResults() {
    return (
      this.filteredProducts.length > 0 ||
      this.filteredCategories.length > 0 ||
      this.filteredEvents.length > 0
    );
  }

  // 🔎 Perform full search
  onSearch() {
    const query = this.searchTerm.trim();
    if (!query) return;

    this.router.navigate(['/products'], { queryParams: { q: query } });
    this.resetSearch();
  }

  // 🛍 Navigate to product
  goToProduct(p: Product) {
    this.router.navigate(['/products', p.id]);
    this.resetSearch();
  }

  // 📂 Navigate to category
  goToCategory(c: string) {
    this.router.navigate(['/products'], { queryParams: { category: c } });
    this.resetSearch();
  }

  // 🎉 Navigate to event
  goToEvent(e: { name: string }) {
    this.router.navigate(['/events'], { queryParams: { type: e.name } });
    this.resetSearch();
  }

  // 🧹 Close search suggestions
  onClickOutside() {
    this.showSuggestions = false;
  }

  // 🧭 Reset search state
  private resetSearch() {
    this.searchTerm = '';
    this.showSuggestions = false;
    this.filteredProducts = [];
    this.filteredCategories = [];
    this.filteredEvents = [];
  }

  // 🌫 Scroll shadow (for sticky header)
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 10;
  }

  goBack() {
    window.history.back();
  }

  // 🧹 Clean up
  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
