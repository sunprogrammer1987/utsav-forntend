import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { StorageService } from 'projects/core/src/lib/core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: StorageService) {}

  canActivate(): boolean {
    const token = this.storage.getToken();
    const role = this.storage.getUserRole();
    if (token && role === 'vendor') return true;
    this.router.navigate(['/auth/login']);
    return false;
  }
}



