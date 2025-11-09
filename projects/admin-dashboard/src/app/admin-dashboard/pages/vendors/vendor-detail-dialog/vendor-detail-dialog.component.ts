import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VendorsService } from '../../../services/vendors.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vendor-detail-dialog',
  templateUrl: './vendor-detail-dialog.component.html'
})
export class VendorDetailDialogComponent {
  vendor: any;
  stores: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<VendorDetailDialogComponent>,
    private vendorsService: VendorsService,
    private snack: MatSnackBar
  ) {
    this.vendor = { ...data };
    this.loadStores();
  }

  loadStores() {
    if (!this.vendor?._id) return;
    this.vendorsService.getStores(this.vendor._id).subscribe({
      next: (s) => this.stores = s,
      error: () => this.snack.open('Failed to load stores', 'Dismiss', { duration: 2000 })
    });
  }

  save() {
    const payload = {
      shopName: this.vendor.shopName,
      phone: this.vendor.phone,
      isApproved: this.vendor.isApproved,
      isActive: this.vendor.isActive
    };
    this.vendorsService.update(this.vendor._id, payload).subscribe({
      next: (v) => {
        this.snack.open('Saved', 'OK', { duration: 2000 });
        this.dialogRef.close(true);
      },
      error: (err) => this.snack.open('Save failed', 'Dismiss', { duration: 2000 })
    });
  }

  close() { this.dialogRef.close(false); }
}
