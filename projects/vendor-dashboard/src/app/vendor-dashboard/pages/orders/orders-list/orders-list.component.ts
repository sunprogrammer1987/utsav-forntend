import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from '../../../services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreStateService } from '../../../services/store-state.service';
import { Subscription } from 'rxjs';
import { OrderDetailDialogComponent } from '../order-detail-dialog/order-detail-dialog.component';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  displayedColumns = ['orderId', 'store', 'customer', 'amount', 'status', 'date', 'actions'];
  orders: any[] = [];
  summary: any = {};
  loading = false;
  tabIndex:number = 0;
  selectedStatus = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;
  storeId = 'all';
  storeSub!: Subscription;

  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private storeState: StoreStateService
  ) {}

  ngOnInit() {
    // Reactively listen to store change from header
    this.storeSub = this.storeState.store$.subscribe(id => {
      this.storeId = id;
      this.loadOrders();
    });
  }

  
  loadOrders() {
    this.loading = true;
    const params: any = {
      store: this.storeId || '',
      status: this.selectedStatus || '',
      from: this.fromDate ? this.fromDate.toISOString() : '',
      to: this.toDate ? this.toDate.toISOString() : ''
    };

    this.ordersService.getVendorOrders(params).subscribe({
      next: (res: any) => {
        this.orders = res.orders || res;
        this.loadSummary()
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading orders', err);
        this.loading = false;
      }
    });
  }

  loadSummary() {
    console.log("loadSummaryloadSummary");
    
    this.loading = true;
    const params: any = {
      store: this.storeId || '',
      status: this.selectedStatus || '',
      from: this.fromDate ? this.fromDate.toISOString() : '',
      to: this.toDate ? this.toDate.toISOString() : ''
    };

    this.ordersService.orderSummaryById(params).subscribe({
      next: (res: any) => {
        this.summary = res || {};
        console.log("this.summary",res);
        
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading summary', err);
        this.loading = false;
      }
    });
  }

  exportToExcel() {
    const data = this.orders.map(o => ({
      OrderID: o._id,
      Store: o.store?.name || '-',
      Customer: o.customer?.name || 'Guest',
      Amount: o.total,
      Status: o.orderStatus,
      Date: new Date(o.createdAt).toLocaleDateString()
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
    XLSX.writeFile(wb, `vendor_orders_${Date.now()}.xlsx`);
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.text('Orders Report', 14, 16);
    const rows = this.orders.map(o => [
      o._id.slice(0, 8),
      o.store?.name || '-',
      o.customer?.name || 'Guest',
      '₹' + o.total,
      o.orderStatus.toUpperCase(),
      new Date(o.createdAt).toLocaleDateString()
    ]);
    autoTable(doc, {
      startY: 28,
      head: [['Order ID', 'Store', 'Customer', 'Amount', 'Status', 'Date']],
      body: rows
    });
    doc.save(`vendor_orders_${Date.now()}.pdf`);
  }

  viewDetails(order: any) {
    this.dialog.open(OrderDetailDialogComponent, {
      width: '600px',
      data: order
    });
  }

  updateStatus(order: any, newStatus: string) {
    this.ordersService.updateStatus(order._id, newStatus).subscribe({
      next: () => {
        this.snack.open(`Order marked as ${newStatus}`, 'OK', { duration: 2500 });
        this.loadOrders();
      },
      error: (err) => {
        console.error('Failed to update order:', err);
        this.snack.open('Error updating order', 'Dismiss', { duration: 2500 });
      }
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  resetFilters() {
    this.selectedStatus = '';
    this.fromDate = null;
    this.toDate = null;
    this.loadOrders();
  }
}
