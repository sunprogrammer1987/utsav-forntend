import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderSvc: OrderService) {}

  ngOnInit() {
    this.orderSvc.getOrders().subscribe(o => (this.orders = o));
  }
}
