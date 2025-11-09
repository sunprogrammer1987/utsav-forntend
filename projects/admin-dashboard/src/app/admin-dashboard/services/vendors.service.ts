import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/admin-dashboard/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class VendorsService {
  base = `${environment.apiUrl}/vendors`;

  constructor(private http: HttpClient) {}

  list(page = 1, limit = 20, search = '', status = '') {
    const params: any = { page: String(page), limit: String(limit) };
    if (search) params.search = search;
    if (status) params.status = status;
    return this.http.get<any>(this.base, { params });
  }

  getVendorsByFeature(page = 1, limit = 20, search = '', status = '') {
    const params: any = { page: String(page), limit: String(limit) };
    if (search) params.search = search;
    if (status) params.status = status;
    return this.http.get<any>(`${this.base}/getVendorsByFeature`, { params });
  }  

  getAll() {
    return this.http.get<any[]>(this.base);
  }
  get(id: string) {
    return this.http.get<any>(`${this.base}/${id}`);
  }
  create(payload: any) {
    return this.http.post(this.base, payload);
  }
  update(id: string, payload: any) {
    return this.http.put(`${this.base}/${id}`, payload);
  }
  toggleActive(id: string) {
    return this.http.put(`${this.base}/${id}/toggle`, {});
  }
  approve(id: string) {
    return this.http.put(`${this.base}/${id}/approve`, {});
  }
  delete(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }
  getStores(id: string) {
    return this.http.get<any[]>(`${this.base}/${id}/stores`);
  }

  viewProducts(id: string) {
    return this.http.get<any[]>(`${this.base}/${id}/getProductsByvendor`);
  }
}
