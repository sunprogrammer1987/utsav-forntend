import { Component, OnInit, AfterViewInit} from '@angular/core'
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { Product } from '../../models';
import SwiperCore, { Autoplay, FreeMode } from 'swiper';
SwiperCore.use([Autoplay, FreeMode]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {
  featuredProducts: Product[] = [];
  sellCategories: any[] = [];
  rentCategories: any[] = [];
  eventCategories: any[] = [];

  loading = true;
  constructor(
    private productSvc: ProductService,
    private categorySvc: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.loadCategories();
  }

  loadFeaturedProducts(): void {
    this.productSvc.getAll().subscribe({
      next: (products) => {
        this.featuredProducts = products.filter(p => p.isFeatured);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading featured products:', err);
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
  this.categorySvc.getCategoryTree().subscribe({
    next: (res) => {
      console.log("res0000",res);
      
      this.sellCategories = res.filter(c => c.serviceType === 'sell');
      this.rentCategories = res.filter(c => c.serviceType === 'rent');
      this.eventCategories = res.filter(c => c.serviceType === 'service');
    },
    error: (err) => console.error('Error loading categories', err)
  });
}

  viewDetails(p: Product) {
    this.router.navigate(['/products', p.id]);
  }
  // 🔍 View All
  viewAllCategories() {
    this.router.navigate(['/categories']);
  }
  ngAfterViewInit(): void {
    AOS.init({ duration: 800, once: true, easing: 'ease-in-out' });
  }
}
