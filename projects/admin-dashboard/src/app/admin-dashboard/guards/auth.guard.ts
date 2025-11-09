import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from 'projects/core/src/lib/core/services/storage.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private st: StorageService, private router: Router) { }
  canActivate() {
    if (this.st.getToken()) {
      console.log("AuthGuard this.st.getToken()",this.st.getToken());      
      return true;
    }
    else{
      console.log("AuthGuard else");  

      this.router.navigate(['/auth/login']);
    }
    return false;
  }
}
