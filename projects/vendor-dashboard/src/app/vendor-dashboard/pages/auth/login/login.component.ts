import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from 'projects/core/src/lib/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
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
      next: (res:any) => {
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
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.snack.open('Invalid credentials. Please try again.', 'Dismiss', { duration: 2000 });
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
