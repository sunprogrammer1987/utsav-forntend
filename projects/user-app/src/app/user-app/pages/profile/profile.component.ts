import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({ selector: 'app-profile', templateUrl: './profile.component.html' })
export class ProfileComponent {
  user: any;
  constructor(private auth: AuthService, private router: Router) {
    const u = localStorage.getItem('user');
    this.user = u ? JSON.parse(u) : null;
  }


  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}