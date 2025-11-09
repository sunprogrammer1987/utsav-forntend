import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  animations: [
    trigger('fadeZoom', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate(
          '250ms ease-out',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'scale(0.9)' })
        ),
      ]),
    ]),
    trigger('backdropFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class CheckoutComponent {
  items: any[] = [];
  showModal = false;
  paymentMethod = 'card';
  processing = false;
  success = false;
  failed = false;

  form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['sunil@gmail.com', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    date: [''],
  });

  constructor(
    private fb: FormBuilder,
    private cart: CartService,
    private orderSvc: OrderService,
    private paymentSvc: PaymentService,
    private router: Router
  ) {
    this.cart.items$.subscribe((x) => (this.items = x));
  }

  get total() {
    return this.items.reduce((s, i) => s + i.price, 0);
  }

  openPaymentModal() {
    console.log("openPaymentModal",this.form.invalid);
    
    if (this.form.invalid) return;
    this.showModal = true;
    this.success = false;
    this.failed = false;
  }

  closeModal() {
    this.showModal = false;
    this.processing = false;
    this.success = false;
    this.failed = false;
  }

  confirmPayment() {
  this.processing = true;
  this.failed = false;
  this.success = false;
    console.log("confirmPaymentconfirmPayment");
    
  // Mock payment animation time (3 seconds)
  const duration = 3000;

  // Optional: play "processing" sound (requires small mp3 in assets)
  // new Audio('assets/sounds/processing.mp3').play();

  setTimeout(() => {
    this.processing = false;
    // const isSuccess = Math.random() > 0.1; // 90% success chance
    const isSuccess = Math.random(); // 100% success chance

    if (isSuccess) {
      this.success = true;
      // Optional success sound
      // new Audio('assets/sounds/success.mp3').play();

      setTimeout(() => this.placeOrder(), 1500);
      // setTimeout(() => this.submit(), 1500);
    } else {
      this.failed = true;
      // Optional fail sound
      // new Audio('assets/sounds/fail.mp3').play();
    }
  }, duration);
}


  retryPayment() {
    this.failed = false;
    this.processing = false;
    this.success = false;
    setTimeout(() => this.confirmPayment(), 400);
  }

  placeOrder() {
    console.log("placeOrderplaceOrder");
    
    const payload = {
      customer: this.form.value,
      items: this.items,
      total: this.total,
      payment: { method: this.paymentMethod, transactionId: 'TXN' + Date.now() },
    };

    this.orderSvc.placeOrder(payload).subscribe(() => {
      this.cart.clear();
      this.closeModal();
      this.router.navigate(['/orders/payment-success'], {
        queryParams: { id: payload.payment.transactionId },
        replaceUrl: true,
      });
    });
  }

   submit() {
    if (this.form.invalid) return;
    // Step 1: Create order on backend
    this.paymentSvc.createOrder(this.total * 100).subscribe(order => {
      this.openRazorpay(order);
    });
  }

  openRazorpay(order: any) {
    const options = {
      key: 'rzp_test_1234567890', // 🔑 Replace with your Razorpay Key ID
      amount: order.amount,
      currency: 'INR',
      name: 'DecorntLite',
      description: 'Event Booking Payment',
      order_id: order.id,
      handler: (response: any) => {
        this.verifyPayment(response);
      },
      prefill: {
        name: this.form.value.name,
        email: this.form.value.email,
        contact: this.form.value.phone
      },
      theme: { color: '#3b82f6' }
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  }

  verifyPayment(response: any) {
    this.paymentSvc.verifyPayment(response).subscribe({
      next: (res) => {
        if (res.success) {
          this.cart.clear();
          this.router.navigate(['/payment-success'], {
            queryParams: { id: res.paymentId }
          });
        } else {
          this.router.navigate(['/payment-failed']);
        }
      },
      error: () => {
        this.router.navigate(['/payment-failed']);
      }
    });
  }
}
