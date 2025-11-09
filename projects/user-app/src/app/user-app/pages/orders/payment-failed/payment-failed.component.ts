import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-failed',
  templateUrl: './payment-failed.component.html'
})
export class PaymentFailedComponent implements OnInit {
  transactionId = '';
  total = 0;
  method = 'card';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.transactionId = this.route.snapshot.queryParamMap.get('id') || 'TXN000';
    this.total = Number(this.route.snapshot.queryParamMap.get('total')) || 0;
    this.method = this.route.snapshot.queryParamMap.get('method') || 'card';
  }

  retryPayment() {
    this.router.navigate(['/checkout'], {
      queryParams: {
        retry: true,
        total: this.total
      }
    });
  }
}
