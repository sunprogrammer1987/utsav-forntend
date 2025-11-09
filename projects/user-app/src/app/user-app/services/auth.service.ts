import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: any[] = JSON.parse(localStorage.getItem('users') || '[]');
  private resetTokens: Record<string, string> = {}; // token → email
  private otps: Record<string, string> = {}; // email → otp
  private api = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  /** LOGIN */
  login1(email: string, password: string) {
    console.log("loginlogin");

    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) return throwError(() => 'Invalid email or password');
    if (!user.isVerified) return throwError(() => 'Please verify your email first.');

    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('user', JSON.stringify(user));
    return of({ token: 'mock-jwt-token' }).pipe(delay(500));
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.api}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  /** REGISTER (requires OTP verification) */
  register(payload: any) {
    const exists = this.users.find(u => u.email === payload.email);
    if (exists) return throwError(() => 'User already exists');

    const otp = this.generateOtp();
    this.otps[payload.email] = otp;
    console.log(`📩 Mock OTP for ${payload.email}: ${otp}`);

    const tempUser = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      isVerified: false,
      createdAt: new Date()
    };

    this.users.push(tempUser);
    localStorage.setItem('users', JSON.stringify(this.users));

    return of({ success: true, otp }).pipe(delay(800));
  }

  /** VERIFY REGISTRATION OTP */
  verifyOtp(email: string, otp: string) {
    const validOtp = this.otps[email];
    if (!validOtp) return throwError(() => 'No OTP found. Please request again.');
    if (validOtp !== otp) return throwError(() => 'Invalid OTP.');

    const user = this.users.find(u => u.email === email);
    if (user) {
      user.isVerified = true;
      localStorage.setItem('users', JSON.stringify(this.users));
    }
    delete this.otps[email];

    return of({ success: true }).pipe(delay(800));
  }

  /** FORGOT PASSWORD */
  forgotPassword(email: string) {
    const user = this.users.find(u => u.email === email);
    if (!user) return throwError(() => 'No user found with this email.');

    const otp = this.generateOtp();
    this.otps[email] = otp;
    console.log(`🔐 Mock Password Reset OTP for ${email}: ${otp}`);

    return of({ success: true, otp }).pipe(delay(800));
  }

  /** RESET PASSWORD using verified OTP */
  resetPassword(email: string, otp: string, newPassword: string) {
    const validOtp = this.otps[email];
    if (!validOtp) return throwError(() => 'No OTP found. Please request again.');
    if (validOtp !== otp) return throwError(() => 'Invalid OTP.');

    const user = this.users.find(u => u.email === email);
    if (!user) return throwError(() => 'User not found.');

    user.password = newPassword;
    localStorage.setItem('users', JSON.stringify(this.users));
    delete this.otps[email];

    console.log(`✅ Password updated for ${email}`);
    return of({ success: true }).pipe(delay(800));
  }

  /** GENERATE RANDOM 6-DIGIT OTP */
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}
