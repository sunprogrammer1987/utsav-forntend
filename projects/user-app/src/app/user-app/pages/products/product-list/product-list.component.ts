import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { CartService } from '../../../services/cart.service';
import { WishlistService } from '../../../services/wishlist.service';
import { ToastService } from '../../../services/toast.service';
import { LoaderService } from '../../../services/loader.service';
import { Product } from '../../../models';
import { isPlatformBrowser } from '@angular/common';
import { MockDataService } from '../../../services/mock-data.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  breadcrumbItems: any = [{ label: 'Home', link: '/' }];
  // allProducts: Product[] = [];
  allProducts: any[] = [];
  filteredProducts: Product[] = [];
  products: Product[] = [];

  categories: any[] = [];
  selectedCategory: any = null;
  selectedSubCategory: any = null;
  sidebarOpen = false;
  isMobile = false;
  searchTerm = '';
  sortBy = 'default';
  type: 'sale' | 'rental' | undefined;

  pageSize = 8;
  pageIndex = 0;
  hasMore = true;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private productSvc: ProductService,
    private categorySvc: CategoryService,
    private cart: CartService,
    private wishlist: WishlistService,
    private toast: ToastService,
    private loader: LoaderService,
    private mockSvc: MockDataService
  ) {}

  ngOnInit(): void {
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());

    this.route.params.subscribe((params) => {
      const categorySlug = params['categorySlug'];
      const subSlug = params['subSlug'];
      const serviceType = params['serviceType'];

      if (categorySlug && subSlug) {
        // ✅ Subcategory view
        this.filterBySubcategory(categorySlug, subSlug, serviceType);
      }
    });
  }

  filterBySubcategory(
    categorySlug: string,
    subSlug: string,
    serviceType: string
  ) {
    this.categorySvc
      .getCategoryTreeByserviceType(serviceType)
      .subscribe((cats) => {
        this.categories = cats.filter((cat) => cat.serviceType == serviceType);
        const category = cats.find(
          (c) => c.slug === categorySlug && c.serviceType === serviceType
        );
        if (category) {
          this.selectedCategory = category;
          const sub = category.children?.find(
            (s: any) => s.slug === subSlug && s.serviceType === serviceType
          );
          if (sub) this.selectedSubCategory = sub;
        }

        // ✅ Get products for this subcategory
        this.getProducts(subSlug, serviceType);
      });
  }

  getProducts(slug: string, serviceType: string) {
    this.productSvc.getCategoryProducts(slug, serviceType).subscribe((res) => {
      this.allProducts = res.products;
      this.products = res.products;
      // ✅ Update breadcrumb AFTER data is loaded
      this.setbreadcrumb();
    });
  }

  setbreadcrumb() {
    this.breadcrumbItems = [
      { label: 'Home', link: '/', icon: 'fa fa-home' }, ...(this.selectedCategory ? [
            {
              label: this.selectedCategory.name,
              link: `/categories/${this.selectedCategory.slug}`,
              icon: 'fa fa-folder-open',
            },
          ]: []), ...(this.selectedSubCategory ? [{ label: this.selectedSubCategory.name, icon: 'fa fa-cube' }] : []),
    ];
  }

  onCategoryClick(cat: any) {
    this.selectedCategory = cat;
    this.selectedSubCategory = null;

    this.productSvc
      .getCategoryProducts(cat.slug, cat.serviceType)
      .subscribe((res) => {
        this.products = res.products;
        // ✅ Update breadcrumb after category load
        this.setbreadcrumb();
      });
  }

  onSubCategoryClick(sub: any) {
    this.selectedSubCategory = sub;

    this.productSvc
      .getCategoryProducts(sub.slug, sub.serviceType)
      .subscribe((res) => {
        this.products = res.products;
        // ✅ Update breadcrumb after subcategory load
        this.setbreadcrumb();
      });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  checkMobile() {
    this.isMobile = window.innerWidth < 1024;
  }

  applyFilters(reset: boolean = false) {
    let filtered = this.allProducts.filter((p) => {
      const catMatch =
        !this.selectedCategory || p.category === this.selectedCategory.name;
      const subMatch =
        !this.selectedSubCategory ||
        p.subcategory === this.selectedSubCategory.name;
      const searchMatch =
        !this.searchTerm ||
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return catMatch && subMatch && searchMatch;
    });

    switch (this.sortBy) {
      case 'priceLow':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    this.filteredProducts = filtered;

    if (reset) {
      this.pageIndex = 0;
      this.products = [];
      this.hasMore = true;
    }
    this.loadMore();
  }

  loadMore() {
    if (this.loading || !this.hasMore) return;
    this.loading = true;

    const start = this.pageIndex * this.pageSize;
    const chunk = this.filteredProducts.slice(start, start + this.pageSize);

    this.products = [...this.products, ...chunk];
    this.pageIndex++;
    this.hasMore = this.products.length < this.filteredProducts.length;
    this.loading = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      window.innerHeight;
    const max = document.documentElement.scrollHeight;
    if (pos >= max - 200) this.loadMore();
  }

  addToCart(p: Product) {
    this.loader.show();
    this.cart.add(p);
    this.loader.hide();
    this.toast.success(`${p.name} added to cart`);
  }

  addToWishlist(p: Product) {
    this.loader.show();
    this.wishlist.add(p);
    this.loader.hide();
    this.toast.success(`${p.name} added to wishlist ❤️`);
  }
}
