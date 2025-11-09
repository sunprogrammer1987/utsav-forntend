import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { NotificationService } from 'projects/core/src/lib/core/services/notification.service';
import { VendorsService } from '../../../services/vendors.service';
import { StoresService } from '../../../services/stores.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  displayedColumns = ['name', 'slug', 'parent', 'vendor', 'store', 'actions'];
  categories: any[] = [];
  vendors: any[] = [];
  stores: any[] = [];
  selectedVendor: string = '';
  selectedStore: string = '';
  loading = true;

  constructor(
    private categoryService: CategoryService,
    private vendorService: VendorsService,
    private storeService: StoresService,
    private dialog: MatDialog,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.loadVendors();
    this.loadCategories();
  }

  // 🟢 Load Vendors for Filter Dropdown
  loadVendors() {
    this.vendorService.list().subscribe({
      next: res => (this.vendors = res),
      error: () => this.notify.error('Failed to load vendors')
    });
  }

  // 🟢 When vendor changes → load stores for that vendor
  onVendorChange() {
    this.selectedStore = '';
    if (this.selectedVendor) {
      this.storeService.getStoresByVendor( this.selectedVendor).subscribe({
        next: res => (this.stores = res),
        error: () => this.notify.error('Failed to load stores')
      });
    } else {
      this.stores = [];
    }
    this.loadCategories();
  }

  // 🟢 When store changes → reload categories
  onStoreChange() {
    this.loadCategories();
  }

  // 🟢 Load categories based on selected filters
  loadCategories() {
    this.loading = true;
    const params: any = {};
    if (this.selectedVendor) params.vendor = this.selectedVendor;
    if (this.selectedStore) params.store = this.selectedStore;

    this.categoryService.getCategoryByIDs(params).subscribe({
      next: res => {
        this.categories = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notify.error('Failed to load categories');
      }
    });
  }

  openForm(category?: any) {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '400px',
      data: {
        categories: this.categories,
        category: category || null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadCategories();
    });
  }

  deleteCategory(id: string) {
    if (!confirm('Delete this category?')) return;
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.notify.success('Category deleted');
        this.loadCategories();
      },
      error: () => this.notify.error('Delete failed')
    });
  }
}
