import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/admin-dashboard/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private api = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getById(id: string) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  getAll(
    params: {
      vendor?: string;
      store?: string;
      status?: string;
      from?: string;
      to?: string;
      page?: number;
      limit?: number;
      sortField?: string;
      sortOrder?: 'asc' | 'desc';
    } = {}
  ) {
    return this.http.get<any>(`${this.api}`, { params });
  }

  getSummary(
    params: {
      vendor?: string;
      store?: string;
      status?: string;
      from?: string;
      to?: string;
      page?: number;
      limit?: number;
      sortField?: string;
      sortOrder?: 'asc' | 'desc';
    } = {}
  ) {
    return this.http.get<any>(`${this.api}/summary`, { params });
  }

  updateStatus(id: string, orderStatus: string) {
    return this.http.put(`${this.api}/${id}`, { orderStatus });
  }
}
