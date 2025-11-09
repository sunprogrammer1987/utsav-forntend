import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html'
})
export class VerifyOtpComponent {
  form = this.fb.group({
    otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });

  email = '';
  loading = false;
  success = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private toast: ToastService
  ) {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }

  /** 🔐 Verify entered OTP */
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const otp = this.form.value.otp!;

    this.auth.verifyOtp(this.email, otp).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err;
      }
    });
  }

  /** 🔁 Resend OTP */
  resendOtp() {
    this.auth.register({ email: this.email, name: '', password: '' }).subscribe({
      next: () =>     this.toast.success('📩 New OTP sent to your email!'),
      error: () => this.toast.error('⚠️ Could not resend OTP. Please try again later.')
    });
  }
}
