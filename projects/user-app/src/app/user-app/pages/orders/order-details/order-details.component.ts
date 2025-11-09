import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  progress = 0;

  steps = [
    { label: 'Ordered', completed: false, icon: '1' },
    { label: 'Shipped', completed: false, icon: '2' },
    { label: 'Delivered', completed: false, icon: '3' }
  ];

  constructor(private route: ActivatedRoute, private orderSvc: OrderService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.orderSvc.getOrderById(id!).subscribe((o) => {
      this.order = o;
      this.updateSteps();
    });
  }

  updateSteps() {
    if (!this.order?.status) return;
    const status = this.order.status.toLowerCase();

    // Reset all
    this.steps.forEach((s) => (s.completed = false));

    if (status === 'ordered') {
      this.steps[0].completed = true;
      this.progress = 20;
    } else if (status === 'shipped') {
      this.steps[0].completed = this.steps[1].completed = true;
      this.progress = 60;
    } else if (status === 'delivered') {
      this.steps.forEach((s) => (s.completed = true));
      this.progress = 100;
    } else if (status === 'cancelled') {
      this.progress = 0;
    }

    // Smooth animation
    setTimeout(() => {
      this.progress = this.progress; // triggers Angular’s animation cycle
    }, 100);
  }

  downloadInvoice() {
    const blob = new Blob([`Invoice for Order #${this.order.id}\nAmount: ₹${this.order.total}`], {
      type: 'text/plain'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Invoice-${this.order.id}.txt`;
    link.click();
  }
}
