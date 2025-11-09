import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { categories, products } from '../../../assets/json/dummy-data';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  getCategories() {
    return of(categories);
  }

  getProducts() {
    return of(products);
  }

  getProductsByCategory(categoryName: string) {
    return of(products.filter(p => p.category === categoryName));
  }

  getFeaturedProducts() {
    return of(products.filter(p => p.isFeatured));
  }
}
