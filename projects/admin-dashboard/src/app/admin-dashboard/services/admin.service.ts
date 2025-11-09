import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/admin-dashboard/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) { }

  // Products
  // getAllProducts() {
  //   return this.http.get(`${environment.apiUrl}/products`);
  // }

  getAllProducts(params?: any) {
    return this.http.get(
      `${environment.apiUrl}/products/getAllProductsByFeature`,
      { params }
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }

  // Vendors
  getVendors() {
    return this.http.get(`${environment.apiUrl}/admin/vendors`);
  }

  // Categories
  getCategories() {
    return this.http.get(`${environment.apiUrl}/categories`);
  }

  // Orders
  getAllOrders() {
    return this.http.get(`${environment.apiUrl}/orders`);
  }

  getAllUsers() {
    return this.http.get(`${environment.apiUrl}/users`);
  }

  getStats() {
    return this.http.get(`${environment.apiUrl}/admin/stats`);
  } // expects {users,orders,vendors}

  createProduct(data: FormData) {
    return this.http.post(`${environment.apiUrl}/products`, data);
  }

  updateProduct(id: string, data: FormData) {
    return this.http.put(`${environment.apiUrl}/products/${id}`, data);
  }
}
