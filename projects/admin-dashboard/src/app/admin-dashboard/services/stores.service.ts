import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/admin-dashboard/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class StoresService {
  base = `${environment.apiUrl}/stores`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(this.base);
  }

  getAll() {
    return this.http.get<any[]>(this.base);
  }
    
  assignVendor(storeId: string, vendorId: string) {
    return this.http.put(`${this.base}/assign`, { storeId, vendorId });
  }

  get(id: string) {
    return this.http.get(`${this.base}/${id}`);
  }
  create(data: any) {
    return this.http.post(this.base, data);
  }
  update(id: string, data: any) {
    return this.http.put(`${this.base}/${id}`, data);
  }
  toggle(id: string) {
    return this.http.put(`${this.base}/${id}/toggle`, {});
  }
  delete(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }
  getStoresByVendor(id: string) {
    return this.http.get<any[]>(`${this.base}/storesByVendor/${id}`);
  }
}
