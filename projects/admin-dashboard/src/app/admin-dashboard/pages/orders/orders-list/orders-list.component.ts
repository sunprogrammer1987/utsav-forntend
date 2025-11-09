import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from '../../../services/orders.service';
import { OrderDetailDialogComponent } from '../order-detail-dialog/order-detail-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoresService } from '../../../services/stores.service';
import { VendorsService } from '../../../services/vendors.service';

// 📦 New imports for export
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  displayedColumns = ['orderId', 'customer', 'amount', 'status', 'date', 'actions'];
  orders: any[] = [];
  summary: any = {};
  vendors: any[] = [];
  stores: any[] = [];
  loading = true;
  selectedVendor = '';
  selectedStore = '';
  selectedStatus = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;
  tabIndex: number = 0;

  constructor(
    private ordersService: OrdersService,
    private vendorsService: VendorsService,
    private storesService: StoresService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadVendors();
  }

  loadVendors() {
    this.vendorsService.getAll().subscribe({
      next: (res) => {
        this.vendors = res || [];
        this.loadOrders();
        this.loadSummary();        
      },
      error: (err) => console.error('Failed to load vendors', err)
    });
  }

  onVendorChange() {
    if (!this.selectedVendor) {
      this.stores = [];
      this.selectedStore = '';
      this.loadOrders();
      this.loadSummary(); 
      return;
    }

    this.storesService.getStoresByVendor(this.selectedVendor).subscribe({
      next: (res) => {
        this.stores = res || [];
        this.selectedStore = '';
        this.loadOrders();
        this.loadSummary(); 
      },
      error: () => console.error('Failed to load stores')
    });
  }


  loadOrders() {
    console.log("loadOrdersloadOrders");
    
    this.loading = true;
    const params: any = {
      vendor: this.selectedVendor || '',
      store: this.selectedStore || '',
      status: this.selectedStatus || '',
      from: this.fromDate ? this.fromDate.toISOString() : '',
      to: this.toDate ? this.toDate.toISOString() : ''
    };

    this.ordersService.getAll(params).subscribe({
      next: (res: any) => {
        this.orders = res.orders || res;
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
      vendor: this.selectedVendor || '',
      store: this.selectedStore || '',
      status: this.selectedStatus || '',
      from: this.fromDate ? this.fromDate.toISOString() : '',
      to: this.toDate ? this.toDate.toISOString() : ''
    };

    this.ordersService.getSummary(params).subscribe({
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
  // 📤 EXPORTS
  exportToCSV() {
    const data = this.orders.map(o => ({
      OrderID: o._id,
      Customer: o.customer?.name || 'Guest',
      Email: o.customer?.email || '-',
      Amount: o.totalAmount,
      Status: o.status,
      Date: new Date(o.createdAt).toLocaleDateString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

    const excelBuffer = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `orders_${Date.now()}.csv`);
  }

  exportToExcel() {
    const data = this.orders.map(o => ({
      OrderID: o._id,
      Customer: o.customer?.name || 'Guest',
      Email: o.customer?.email || '-',
      Amount: o.totalAmount,
      Status: o.status,
      Date: new Date(o.createdAt).toLocaleDateString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, `orders_${Date.now()}.xlsx`);
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Orders Report', 14, 16);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 22);

    const rows = this.orders.map(o => [
      o._id.slice(0, 8),
      o.customer?.name || 'Guest',
      o.customer?.email || '-',
      '₹' + o.total,
      o.orderStatus.toUpperCase(),
      new Date(o.createdAt).toLocaleDateString()
    ]);

    autoTable(doc, {
      startY: 28,
      head: [['Order ID', 'Customer', 'Email', 'Amount', 'Status', 'Date']],
      body: rows
    });

    doc.save(`orders_${Date.now()}.pdf`);
  }

  applyDateFilter() { this.loadOrders(); }
  resetFilters() {
    this.selectedStatus = '';
    this.fromDate = null;
    this.toDate = null;
    this.loadOrders();
  }

  viewDetails(order: any) {
    this.dialog.open(OrderDetailDialogComponent, {
      width: '600px',
      data: order
    });
  }

  updateStatus(order: any, newStatus: string) {
    this.ordersService.updateStatus(order._id, newStatus).subscribe({
      next: (updated) => {
        // order.status = updated.status;
        this.snack.open(`Order marked as `, 'OK', { duration: 2500 });
        this.loadSummary();
      },
      error: (err) => {
        console.error('Failed to update order:', err);
        this.snack.open('Error updating order', 'Dismiss', { duration: 2500 });
      }
    });
  }
}
