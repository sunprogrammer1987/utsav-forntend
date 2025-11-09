import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/user-app/src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  // ✅ FIXED import

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private api = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.api}/carttt`);
  }

  getCategoryTree1(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}//tree`);
  }


  getCategoryTree(): Observable<any[]> {
    return this.http.get<any[]>(this.api).pipe(
      map((categories: any[]) => {  // ✅ Add explicit type
        const mapObj = new Map<string, any>();
        categories.forEach((c: any) => mapObj.set(c._id, { ...c, children: [] }));
        const roots: any[] = [];
        mapObj.forEach((c: any) => {
          if (c.parent) {
            mapObj.get(c.parent)?.children.push(c);
          } else {
            roots.push(c);
          }
        });
        return roots;
      })
    );
  }

  getCategoryTreeByserviceType(serviceType:any): Observable<any[]> {
    const params = { serviceType };
    return this.http.get<any[]>(`${this.api}/categoryByService`,{ params }).pipe(
      map((categories: any[]) => {  // ✅ Add explicit type
        const mapObj = new Map<string, any>();
        categories.forEach((c: any) => mapObj.set(c._id, { ...c, children: [] }));
        const roots: any[] = [];
        mapObj.forEach((c: any) => {
          if (c.parent) {
            mapObj.get(c.parent)?.children.push(c);
          } else {
            roots.push(c);
          }
        });
        return roots;
      })
    );
  }
}
