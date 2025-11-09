import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Product } from '../models';
import { map } from 'rxjs/operators';
import { environment } from 'projects/user-app/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  url = `../../../assets/json/mock-products-unique.json`
  private api = `${environment.apiUrl}/products`;
  

  constructor(private http: HttpClient) { }
  getAll(type?: 'sale' | 'rental'): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      map(products => type ? products.filter(p => p.type === type) : products)
    );
  }

  getById(id: string): Observable<Product | undefined> {
    return this.http.get<Product[]>(this.url).pipe(
      map(products => products.find(p => p.id === id))
    );
  }

  getByCategorySlug(slug: string): Observable<any> {
    return this.http.get(`${this.api}/category/${slug}`);
  }

  getCategoryProducts(slug: string, serviceType: string): Observable<any> {
  console.log("slugslugslug",slug,serviceType);
  
  return this.http.get(`${this.api}/${slug}`, {
    params: { serviceType }
  });
}
}