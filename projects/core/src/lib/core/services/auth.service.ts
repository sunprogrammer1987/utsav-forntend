import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/user-app/src/environments/environment';
import { StorageService } from './storage.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Injectable({ providedIn: 'root' })
export class CoreAuthService {
  constructor(private http: HttpClient, private router: Router, private storage: StorageService, private notify: NotificationService) { }

  register(data: any) {
    return this.http.post(`${environment.apiUrl}/auth/register`, data);
  }
  login(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, data);
  }
  setToken(token: string) {
    this.storage.setToken(token);
  }

  getToken() {
    return this.storage.getToken();
  }
  // logout() {
  //   this.storage.removeToken();
  // }

  logout() {
    const refresh = this.storage.getRefreshToken();
    this.http.post(`${environment.apiUrl}/auth/logout`, { refreshToken: refresh })
      .subscribe({
        next: () => {
          this.storage.removeToken();
          this.router.navigate(['/auth/login']);
          this.notify.info('Logged out successfully');
        },
        error: () => {
          this.storage.removeToken();
          this.router.navigate(['/auth/login']);
          this.notify.error('Error during logout');
        }
      });
  }


  refreshToken(): Observable<any> {
    const refresh = this.storage.getRefreshToken();
    return this.http.post(`${environment.apiUrl}/auth/refresh-token`, { refreshToken: refresh })
      .pipe(
        tap((res: any) => {
          if (res?.token) this.storage.setTokens(res.token, refresh!);
        })
      );
  }
}
