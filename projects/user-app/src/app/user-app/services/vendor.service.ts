import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VendorService {
  private api = `${environment.apiUrl}/vendors`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.api);
  }

  getById(id: string) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  getStores(vendorId: string) {
    return this.http.get<any[]>(`${this.api}/${vendorId}/stores`);
  }

  getProducts(vendorId: string) {
    return this.http.get<any[]>(`${this.api}/${vendorId}/products`);
  }
}
