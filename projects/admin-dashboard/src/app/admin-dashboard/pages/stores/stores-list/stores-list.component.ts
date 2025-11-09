import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoresService } from '../../../services/stores.service';
import { StoreFormComponent } from '../stores-form/stores-form.component';
import { StoreAssignVendorComponent } from '../store-assign-vendor/store-assign-vendor.component';
import { VendorsService } from '../../../services/vendors.service';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.scss']
})
export class StoresListComponent implements OnInit {
  stores: any[] = [];
  vendors: any[] = [];
  selectedVendor: string = 'all';
  loading = false;
  displayedColumns = ['name', 'vendor', 'city', 'status', 'createdAt', 'actions'];

  constructor(
    private storeService: StoresService,
    private vendorService: VendorsService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadVendors(); // ✅ load vendors for filter dropdown
    this.loadStores();
  }

  loadVendors() {
    this.vendorService.list().subscribe({
      next: (res: any) => { this.vendors = res; },
      error: () => this.snack.open('Failed to load vendors', 'Dismiss', { duration: 2000 })
    });
  }

  loadStores() {
    this.loading = true;
    this.storeService.getStoresByVendor(this.selectedVendor).subscribe({
      next: (res: any) => {
        this.stores = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snack.open('Failed to load stores', 'Dismiss', { duration: 2000 });
      }
    });
  }

  onVendorChange() {
    this.loadStores();
  }

  toggle(store: any) {
    this.storeService.toggle(store._id).subscribe({
      next: () => {
        this.snack.open(`Store ${store.isActive ? 'Deactivated' : 'Activated'}`, 'OK', { duration: 2000 });
        this.loadStores();
      }
    });
  }

  openForm(store?: any) {
    this.dialog.open(StoreFormComponent, { width: '500px', data: store })
      .afterClosed().subscribe(() => this.loadStores());
  }

  assignVendor(store: any) {
    const ref = this.dialog.open(StoreAssignVendorComponent, { width: '400px', data: store });
    ref.afterClosed().subscribe(res => { if (res) this.loadStores(); });
  }
}
