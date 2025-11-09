import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/vendor-dashboard/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class StoresService {
  private base = `${environment.apiUrl}/stores`;

  constructor(private http: HttpClient) {}

  // Fetch stores assigned to this vendor
  getMyStores() {
    return this.http.get<any[]>(`${this.base}/my`);
  }

  getById(id: string) {
    return this.http.get<any>(`${this.base}/${id}`);
  }

  updateStore(id: string, data: any) {
    return this.http.put(`${this.base}/${id}`, data);
  }
  
  create(payload:any){ return this.http.post(`${this.base}`, payload); }

}
