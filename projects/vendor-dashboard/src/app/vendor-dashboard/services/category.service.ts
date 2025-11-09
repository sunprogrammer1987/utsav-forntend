import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/admin-dashboard/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private api = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  getParents() {
    return this.http.get<any[]>(`${this.api}?type=parents`);
  }

  getTree() {
    return this.http.get<any[]>(`${this.api}/tree`);
  }
 
  getCategoryByIDs(params: any = {}) {
    return this.http.get<any[]>(`${this.api}/categoryByIds`, { params });
  }
}
