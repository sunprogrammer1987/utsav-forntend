import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoreAuthService } from 'projects/core/src/lib/core/services/auth.service';
import { StorageService } from 'projects/core/src/lib/core/services/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  hide = true;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: CoreAuthService,
    private snack: MatSnackBar,
    private router: Router,
    private storage: StorageService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.invalid) return;
    this.loading = true;

    this.auth.login(this.form.value).subscribe({
      next: (res: any) => {
        this.snack.open('Login successful', 'OK', { duration: 1500 });
        this.storage.setToken(res.token);
        const role = this.decodeRole(res.token);
        // redirect based on role
        if (role === 'admin') {
          console.log('admin');
          this.router.navigateByUrl('/admin');
        }
        else if (role === 'vendor') {
          console.log('vendor');
          this.router.navigateByUrl('/vendor');
        }
        else {
          console.log('else');
          this.router.navigateByUrl('/');
        }
      },
      error: () => {
        this.loading = false;
        this.snack.open('Invalid credentials. Please try again.', 'Dismiss', { duration: 2500 });
      }
    });
  }
  decodeRole(token: string): string {
    try {
      const payload: any = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch {
      return '';
    }
  }
}
