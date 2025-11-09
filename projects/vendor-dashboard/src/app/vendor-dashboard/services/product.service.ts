import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/vendor-dashboard/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  // Get products of a specific store
  getByStore(storeId: string) {
    console.log("getByStoregetByStore");    
    return this.http.get<any[]>(`${this.base}/byStore?storeId=${storeId}`);
  }

  getAllVendorProducts() {
    return this.http.get<any[]>(`${this.base}/vendor`);
  }
  
  getById(id: string) {
    return this.http.get<any>(`${this.base}/${id}`);
  }

  create(storeId: string, product: any) {
    return this.http.post(this.base, { ...product, store: storeId });
  }

  update(id: string, product: any) {
    return this.http.put(`${this.base}/${id}`, product);
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }

  getAllProducts(params?: any) {
    return this.http.get(
      `${environment.apiUrl}/products/getAllProductsByFeature`,
      { params }
    );
  }
  
   deleteProduct(id: string) {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }

  createProduct(data: FormData) {
      return this.http.post(`${environment.apiUrl}/products`, data);
    }
  
    updateProduct(id: string, data: FormData) {
      return this.http.put(`${environment.apiUrl}/products/${id}`, data);
  }
}
