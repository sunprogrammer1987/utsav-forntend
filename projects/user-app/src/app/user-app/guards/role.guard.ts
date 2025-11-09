import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from 'projects/core/src/lib/core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private st: StorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.st.getToken();
    if (!token) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    try {
      const payload: any = jwtDecode(token);
      const allowedRoles = route.data['roles'] as string[];

      if (allowedRoles && allowedRoles.includes(payload.role)) {
        return true;
      }

      // unauthorized role → redirect
      this.router.navigate(['/']);
      return false;

    } catch (err) {
      console.error('Invalid token in RoleGuard:', err);
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
