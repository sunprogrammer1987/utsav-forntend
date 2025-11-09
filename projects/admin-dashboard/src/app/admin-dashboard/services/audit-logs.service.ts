import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'projects/admin-dashboard/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuditLogsService {
  base = `${environment.apiUrl}/audit`;

  constructor(private http: HttpClient) {}

  // supports ?action=&entityType=&from=&to=&page=&limit=
  list(paramsObj: any = {}) {
    let params = new HttpParams();
    Object.keys(paramsObj || {}).forEach(k => {
      if (paramsObj[k] !== undefined && paramsObj[k] !== '') {
        params = params.set(k, paramsObj[k]);
      }
    });
    return this.http.get<any>(this.base, { params });
  }
}
