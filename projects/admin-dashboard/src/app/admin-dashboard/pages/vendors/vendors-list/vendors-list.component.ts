import { Component, OnInit, ViewChild } from '@angular/core';
import { VendorsService } from '../../../services/vendors.service';
import { MatDialog } from '@angular/material/dialog';
import { VendorDetailDialogComponent } from '../vendor-detail-dialog/vendor-detail-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-vendors-list',
  templateUrl: './vendors-list.component.html',
  styleUrls: ['./vendors-list.component.scss']
})
export class VendorsListComponent implements OnInit {
  vendors: any[] = [];
  total = 0;
  page = 1;
  limit = 20;
  loading = false;
  search = '';
  statusFilter = '';

  selection = new SelectionModel<any>(true, []); // multi-select
  displayedColumns = ['select','shopName','owner','email','status','createdAt','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private vendorsService: VendorsService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() { this.load(); }

  load(p = 1) {
    this.loading = true;
    this.vendorsService.getVendorsByFeature(p, this.limit, this.search, this.statusFilter).subscribe({
      next: (res: any) => {
        this.vendors = res.vendors || res; // supports simple array or paged object
        this.total = res.total ?? this.vendors.length;
        this.page = res.page ?? p;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Failed to load vendors', 'Dismiss', { duration: 2500 });
        this.loading = false;
      }
    });
  }

  onSearch() { this.load(1); }

  openDetail(vendor: any) {
    const ref = this.dialog.open(VendorDetailDialogComponent, { width: '720px', data: vendor });
    ref.afterClosed().subscribe(updated => { if (updated) this.load(this.page); });
  }

  approveVendor(vendor: any) {
    if (!confirm(`Approve vendor ${vendor.shopName}?`)) return;
    this.vendorsService.approve(vendor._id).subscribe({
      next: () => { this.snack.open('Vendor approved', 'OK', { duration: 2000 }); this.load(this.page); },
      error: () => this.snack.open('Approve failed', 'Dismiss', { duration: 2000 })
    });
  }

  toggleActive(vendor: any) {
    this.vendorsService.toggleActive(vendor._id).subscribe({
      next: () => { this.snack.open('Status updated', 'OK', { duration: 2000 }); this.load(this.page); },
      error: () => this.snack.open('Operation failed', 'Dismiss', { duration: 2000 })
    });
  }

  deleteVendor(vendor: any) {
    if (!confirm(`Delete vendor ${vendor.shopName}? This cannot be undone.`)) return;
    this.vendorsService.delete(vendor._id).subscribe({
      next: () => { this.snack.open('Vendor deleted', 'OK', { duration: 2000 }); this.load(this.page); },
      error: () => this.snack.open('Delete failed', 'Dismiss', { duration: 2000 })
    });
  }

  
  viewProducts(vendor: any) {
    // navigate to admin route showing vendor's products
    this.router.navigate(['/vendors', vendor._id, 'products']);
  }

  changePage(event: any) {
    const p = event.pageIndex + 1;
    this.load(p);
  }
  // ✅ Bulk Approve Selected
  bulkApprove() {
    const selected = this.selection.selected;
    if (!selected.length) return alert('No vendors selected');
    if (!confirm(`Approve ${selected.length} vendors?`)) return;

    selected.forEach(v =>
      this.vendorsService.approve(v._id).subscribe({
        next: () => {},
        error: () => {}
      })
    );
    setTimeout(() => this.load(this.page), 800);
  }

  // ✅ Bulk Deactivate
  bulkDeactivate() {
    const selected = this.selection.selected;
    if (!selected.length) return alert('No vendors selected');
    if (!confirm(`Deactivate ${selected.length} vendors?`)) return;

    selected.forEach(v =>
      this.vendorsService.toggleActive(v._id).subscribe({
        next: () => {},
        error: () => {}
      })
    );
    setTimeout(() => this.load(this.page), 800);
  }

  // ✅ Bulk Delete
  bulkDelete() {
    const selected = this.selection.selected;
    if (!selected.length) return alert('No vendors selected');
    if (!confirm(`Delete ${selected.length} vendors? This cannot be undone.`)) return;

    selected.forEach(v =>
      this.vendorsService.delete(v._id).subscribe({
        next: () => {},
        error: () => {}
      })
    );
    setTimeout(() => this.load(this.page), 1000);
  }

  // ✅ Export CSV
  exportCSV() {
    const headers = ['Shop Name', 'Owner', 'Email', 'Status', 'Created'];
    const rows = this.vendors.map(v => [
      v.shopName,
      v.user?.name || '-',
      v.user?.email || '-',
      v.isApproved ? (v.isActive ? 'Active' : 'Inactive') : 'Pending',
      new Date(v.createdAt).toLocaleString()
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `vendors_${Date.now()}.csv`);
  }

  // ✅ Export PDF
  exportPDF() {
    const doc = new jsPDF();
    doc.text('Vendor List', 14, 10);
    autoTable(doc, {
      head: [['Shop Name', 'Owner', 'Email', 'Status', 'Created']],
      body: this.vendors.map(v => [
        v.shopName,
        v.user?.name || '-',
        v.user?.email || '-',
        v.isApproved ? (v.isActive ? 'Active' : 'Inactive') : 'Pending',
        new Date(v.createdAt).toLocaleDateString()
      ]),
      startY: 20
    });
    doc.save(`vendors_${Date.now()}.pdf`);
  }
  toggleAll(event: MatCheckboxChange) {
  if (event.checked) {
    this.selection.select(...this.vendors); // works here, in TypeScript
  } else {
    this.selection.clear();
  }
}


}
