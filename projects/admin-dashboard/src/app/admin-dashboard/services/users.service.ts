import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/admin-dashboard/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  base = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  list(page = 1, limit = 20, search = '', role = '', isActive = '') {
    const params: any = { page: String(page), limit: String(limit) };
    if (search) params.search = search;
    if (role) params.role = role;
    if (isActive !== '') params.isActive = String(isActive);
    return this.http.get<any>(this.base, { params });
  }

  get(id: string) {
    return this.http.get(`${this.base}/${id}`);
  }
  create(payload: any) {
    return this.http.post(this.base, payload);
  }
  update(id: string, payload: any) {
    return this.http.put(`${this.base}/${id}`, payload);
  }
  delete(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }
  toggleActive(id: string) {
    return this.http.put(`${this.base}/${id}/toggle`, {});
  }
}
