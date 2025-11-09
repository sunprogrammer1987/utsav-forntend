import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { NotificationService } from 'projects/core/src/lib/core/services/notification.service';
import { VendorsService } from '../../../services/vendors.service';
import { StoresService } from '../../../services/stores.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  products: any[] = [];
  vendors: any[] = [];
  stores: any[] = [];
  categories: any[] = [];

  searchForm = this.fb.group({
    vendor: [''],
    store: [''],
    category: [''],
    search: ['']
  });

  displayedColumns = ['image', 'title', 'vendor', 'store', 'category','serviceType', 'price', 'stock', 'createdAt', 'actions'];
  total = 0;
  pageIndex = 0;
  pageSize = 10;
  loading = true;

  sortField = 'createdAt';
  sortOrder: 'asc' | 'desc' = 'desc';

  constructor(
    private admin: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private notify: NotificationService,
    private vendorSvc: VendorsService,
    private storeSvc: StoresService,
    private categorySvc: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadVendors();
    this.loadProducts();
  }

  // 🔹 Load all vendors
  loadVendors() {
    this.vendorSvc.getAll().subscribe({
      next: res => (this.vendors = res),
      error: () => this.notify.error('Failed to load vendors')
    });
  }

  // 🔹 When vendor changes
  onVendorChange() {
    const vendorId = this.searchForm.value.vendor;
    this.searchForm.patchValue({ store: '', category: '' });
    this.categories = [];

    if (vendorId) {
      this.storeSvc.getStoresByVendor(vendorId).subscribe({
        next: res => (this.stores = res),
        error: () => this.notify.error('Failed to load stores')
      });
    } else {
      this.stores = [];
    }

    this.loadProducts();
  }

  // 🔹 When store changes
  onStoreChange() {
    const storeId = this.searchForm.value.store;
    this.searchForm.patchValue({ category: '' });

    if (storeId) {
      this.categorySvc.getCategoryByIDs({ store: storeId }).subscribe({
        next: res => (this.categories = res),
        error: () => this.notify.error('Failed to load categories')
      });
    } else {
      this.categories = [];
    }

    this.loadProducts();
  }

  // 🔹 Load Products
  loadProducts() {
    this.loading = true;

    const { vendor, store, category, search } = this.searchForm.value;

    // Build query params object
    const queryParams: any = {
      vendor: vendor || '',
      store: store || '',
      category: category || '',
      search: search || '',
      page: this.pageIndex + 1,
      limit: this.pageSize,
      sortField: this.sortField,
      sortOrder: this.sortOrder
    };

    // Fetch data
    this.admin.getAllProducts(queryParams).subscribe({
      next: (res: any) => {
        // Handle both structured and array responses gracefully
        this.products = res?.products || (Array.isArray(res) ? res : []);
        this.total = res?.total || this.products.length || 0;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Failed to load products:', err);
        this.loading = false;
        this.products = [];
        this.total = 0;
      }
    });
  }


  onSearch() {
    this.pageIndex = 0;
    this.loadProducts();
  }

  onSortChange(sort: Sort) {
    this.sortField = sort.active;
    this.sortOrder = sort.direction === 'asc' ? 'asc' : 'desc';
    this.loadProducts();
  }

  onPageChange(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadProducts();
  }

  openForm(product?: any) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: product || null
    });
    dialogRef.afterClosed().subscribe(refresh => {
      if (refresh) this.loadProducts();
    });
  }

  deleteProduct(id: string) {
    if (!confirm('Delete this product?')) return;
    this.admin.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p._id !== id);
        this.total--;
        this.notify.success('Product deleted successfully');
      },
      error: () => this.notify.error('Failed to delete product')
    });
  }
}
