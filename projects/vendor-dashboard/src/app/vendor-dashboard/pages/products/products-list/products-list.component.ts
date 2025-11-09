import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { NotificationService } from 'projects/core/src/lib/core/services/notification.service';
import { StoresService } from '../../../services/stores.service';
import { CategoryService } from '../../../services/category.service';
import { Subscription } from 'rxjs';
import { StoreStateService } from '../../../services/store-state.service';

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
    store: [''],
    category: [''],
    search: ['']
  });

  displayedColumns = ['image', 'title', 'vendor', 'store', 'category', 'price', 'stock', 'createdAt', 'actions'];
  total = 0;
  pageIndex = 0;
  pageSize = 10;
  loading = true;

  sortField = 'createdAt';
  sortOrder: 'asc' | 'desc' = 'desc';
  storeSub!: Subscription;
  storeId: string = 'all';

  constructor(
    private productSvc: ProductService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private notify: NotificationService,
    private storeSvc: StoresService,
    private categorySvc: CategoryService,
    private storeState: StoreStateService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.storeSub = this.storeState.store$.subscribe(id => {
      console.log("storeId", id);
      this.storeId = id;
      // this.loadProducts();
      if (this.storeId) {
        this.categorySvc.getCategoryByIDs({ store: this.storeId }).subscribe({
          next: res => (this.categories = res),
          error: () => this.notify.error('Failed to load categories')
        });
      } else {
        this.categories = [];
      }
      this.loadProducts();
    });

  }

  // 🔹 Load Products
  loadProducts() {
    this.loading = true;
    console.log("this.searchForm.value",this.searchForm.value);
    
    const { category, search } = this.searchForm.value;

    // Build query params object
    const queryParams: any = {
      store: this.storeId || '',
      category: category || '',
      search: search || '',
      page: this.pageIndex + 1,
      limit: this.pageSize,
      sortField: this.sortField,
      sortOrder: this.sortOrder
    };

    // Fetch data
    this.productSvc.getAllProducts(queryParams).subscribe({
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
    this.productSvc.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p._id !== id);
        this.total--;
        this.notify.success('Product deleted successfully');
      },
      error: () => this.notify.error('Failed to delete product')
    });
  }
  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
