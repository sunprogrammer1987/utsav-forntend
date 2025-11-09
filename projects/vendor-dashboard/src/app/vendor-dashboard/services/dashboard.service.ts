import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/vendor-dashboard/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private base = `${environment.apiUrl}/stats/vendor`;

  constructor(private http: HttpClient) {}

  getSummary() {
    return this.http.get(`${this.base}`);
  }
}
