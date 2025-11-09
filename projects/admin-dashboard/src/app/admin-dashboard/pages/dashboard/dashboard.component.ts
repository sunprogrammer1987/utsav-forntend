

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from '../../services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  displayedColumns = ['orderId', 'customer', 'amount', 'status', 'date', 'actions'];
  orders: any[] = [];
  summary: any = {};
  loading = true;
  selectedStatus = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;

  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadSummary();
  }

  

  loadSummary() {
    // const from = this.fromDate ? this.fromDate.toISOString() : undefined;
    // const to = this.toDate ? this.toDate.toISOString() : undefined;

    // this.ordersService.getSummary(this.selectedStatus, from, to).subscribe({
    //   next: (res) => (this.summary = res || {}),
    //   error: (err) => console.error('Error loading summary', err)
    // });
  }

  }
