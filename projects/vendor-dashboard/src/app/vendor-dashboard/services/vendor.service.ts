import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/vendor-dashboard/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class VendorService {
  private base = `${environment.apiUrl}/vendors`;

  constructor(private http: HttpClient) {}

  // Get vendor profile based on logged-in vendor user
  getProfile() {
    return this.http.get<any>(`${this.base}/me`);
  }

  updateProfile(data: any) {
    return this.http.put(`${this.base}/me`, data);
  }
}
