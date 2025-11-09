import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'projects/user-app/src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  

  getAll(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/carttt`);
  }
}
