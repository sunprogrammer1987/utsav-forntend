import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { NotificationService } from 'projects/core/src/lib/core/services/notification.service';
import { StoresService } from '../../../services/stores.service';
import { Subscription } from 'rxjs';
import { StoreStateService } from '../../../services/store-state.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  displayedColumns = ['name', 'slug', 'parent', 'vendor', 'store', 'actions'];
  categories: any[] = [];
  stores: any[] = [];
  loading = true;
  storeSub!: Subscription;
  storeId = 'all';

  constructor(
    private categoryService: CategoryService,
    private storeService: StoresService,
    private dialog: MatDialog,
    private notify: NotificationService,
    private storeState: StoreStateService
  ) {}

  ngOnInit() {
    // Reactively listen to store change from header
    this.storeSub = this.storeState.store$.subscribe(id => {
      this.storeId = id;
      this.loadCategories();
    });
  }

  // 🟢 Load categories based on selected filters
  loadCategories() {
    this.loading = true;
    const params: any = {};
    if (this.storeId) params.store = this.storeId;

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
  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
