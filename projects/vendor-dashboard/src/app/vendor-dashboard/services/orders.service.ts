import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private api = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  // Get all vendor orders (all stores)
  // getVendorOrders(orderStatus?: string, from?: string, to?: string) {
  //   let params = new HttpParams();
  //   if (orderStatus) params = params.set('orderStatus', orderStatus);
  //   if (from) params = params.set('from', from);
  //   if (to) params = params.set('to', to);
  //   return this.http.get<any[]>(`${this.api}/orders`, { params });
  // }
// getVendorOrders(orderStatus?: string, from?: string, to?: string, storeId?: string) {
//     const params = new URLSearchParams();
//     if (orderStatus) params.append('orderStatus', orderStatus);
//     if (from) params.append('from', from);
//     if (to) params.append('to', to);
//     if (storeId) params.append('storeId', storeId);
//     const url = `${this.api}/ordersById?${params.toString()}`;
//     return this.http.get<any[]>(url);
//   }

  getVendorOrders(
    params: {
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
    return this.http.get<any>(`${this.api}/ordersById`, { params });
  }

  orderSummaryById(
    params: {
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
    return this.http.get<any>(`${this.api}/orderSummaryById`, { params });
  }

  // Get orders by specific store
  getByStore(storeId: string, orderStatus?: string, from?: string, to?: string) {
    let params = new HttpParams();
    if (orderStatus) params = params.set('orderStatus', orderStatus);
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);
    return this.http.get<any[]>(`${this.api}/${storeId}`, { params });
  }

  getById(id: string) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  updateStatus(id: string, orderStatus: string) {
    return this.http.put(`${this.api}/${id}`, { orderStatus });
  }

  getSummary(orderStatus?: string, from?: string, to?: string, storeId?: string) {
    let params = new HttpParams();
    if (orderStatus) params = params.set('orderStatus', orderStatus);
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);
    if (storeId) params = params.set('storeId', storeId);
    return this.http.get<any>(`${this.api}/summary`, { params });
  }
}
