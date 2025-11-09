import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'projects/admin-dashboard/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private api = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) { }

  list(params: any): Observable<any> {
    console.log("eventsevents");

    return this.http.get(`${this.api}`, { params });
  }
  create(payload: any) {
    return this.http.post(`${this.api}`, payload);
  }
  get(id: string) {
    return this.http.get(`${this.api}/${id}`);
  }
  update(id: string, payload: any) {
    return this.http.put(`${this.api}/${id}`, payload);
  }
  delete(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
  changeStatus(id: string, status: string) {
    return this.http.patch(`${this.api}/${id}/status`, { status });
  }

  getAll(params: any = {}) {
    return this.http.get<any>(`${this.api}/bookings`, { params });
  }


  // vendor submissions
  vendorSubmissions(status = 'Pending') {
    return this.http.get(`${this.api}/vendor-submissions`, {
      params: { status },
    });
  }

  // bookings
  listBookings(params: any) {
    return this.http.get(`${this.api}/bookings`, { params });
  }
  updateBookingStatus(id: string, status: string) {
    return this.http.patch(`${this.api}/bookings/${id}/status`, { status });
  }

  getBookingById(id: string) {
    return this.http.get(`${this.api}/getBookingById/${id}`);
  }
}
