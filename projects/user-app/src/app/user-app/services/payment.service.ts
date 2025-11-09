// import { Injectable } from '@angular/core';
// import { of } from 'rxjs';
// import { delay } from 'rxjs/operators';


// @Injectable({ providedIn: 'root' })
// export class PaymentService {
//   initiatePayment(order: any) {
//     console.log('Initiating mock payment for order:', order);
//     // Simulate redirect to payment gateway
//     return of({ success: true, transactionId: 'TXN' + Math.floor(Math.random() * 1000000) }).pipe(delay(1000));
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private api = `${environment.apiUrl}/razorpay`;
  constructor(private http: HttpClient) {}

  // Step 1: Create order on server
  createOrder(amount: number): Observable<any> {
    return this.http.post(`${this.api}/createOrder`, { amount });
  }

  // Step 2: Verify payment after success
  verifyPayment(data: any): Observable<any> {
    return this.http.post(`${this.api}/verify`, data);
  }
}
