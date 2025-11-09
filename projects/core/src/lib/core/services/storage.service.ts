import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private tokenKey = 'auth_token';
  private refreshKey = 'refresh_token';

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  setTokens(token: string, refresh: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.refreshKey, refresh);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshKey);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshKey);
  }
  getUserRole() : string{
    return 'vendor';
  }
}
