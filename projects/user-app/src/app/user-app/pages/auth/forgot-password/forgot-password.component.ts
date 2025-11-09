import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  loading = false;
  success = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const email = this.form.value.email!;

    this.auth.forgotPassword(email).subscribe({
      next: (res) => {
        this.loading = false;
        this.success = true;

        // Automatically redirect to reset-password after OTP is "sent"
        setTimeout(() => {
          this.router.navigate(['/auth/reset-password'], {
            queryParams: { email }
          });
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err;
      }
    });
  }
}
