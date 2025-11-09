import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoresService } from '../../../services/stores.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VendorsService } from '../../../services/vendors.service';

@Component({
  selector: 'app-store-form',
  templateUrl: './stores-form.component.html'
})
export class StoreFormComponent implements OnInit {
  store: any = {};
  vendors: any[] = []; // ✅ vendor list

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<StoreFormComponent>,
    private service: StoresService,
    private VendorSrv: VendorsService, // ✅ new service for vendors
    private snack: MatSnackBar
  ) {
    if (data) this.store = { ...data };
  }

  ngOnInit() {
    this.loadVendors();
  }

  // ✅ Fetch all vendors
  loadVendors() {
    this.VendorSrv.getAll().subscribe({
      next: (res: any) => {
        this.vendors = Array.isArray(res) ? res : res.vendors || [];
      },
      error: () => {
        this.snack.open('Failed to load vendors', 'Dismiss', { duration: 2000 });
      }
    });
  }

  // ✅ Save Store (Create or Update)
  save() {
    const req = this.store._id
      ? this.service.update(this.store._id, this.store)
      : this.service.create(this.store);

    req.subscribe({
      next: () => {
        this.snack.open('✅ Store saved successfully', 'OK', { duration: 2000 });
        this.ref.close(true);
      },
      error: () => this.snack.open('❌ Save failed', 'Dismiss', { duration: 2000 })
    });
  }
}
