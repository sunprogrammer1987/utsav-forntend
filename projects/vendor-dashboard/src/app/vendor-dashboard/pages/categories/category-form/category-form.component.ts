import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { NotificationService } from 'projects/core/src/lib/core/services/notification.service';
import { StoresService } from '../../../services/stores.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    slug: [''],
    parent: [''],
    store: [''],
    serviceType: ['', Validators.required],
  });

  categories: any[] = [];
  parentcategories: any[] = [];
  vendors: any[] = [];
  stores: any[] = [];
  loading = false;
  serviceType = [{ _id: 'sell', 'name': 'sell' }, { _id: 'rent', 'name': 'rent' }, { _id: 'service', 'name': 'service' }];

  constructor(
    private fb: FormBuilder,
    private categorySvc: CategoryService,
    private storeSvc: StoresService,
    private notify: NotificationService,
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.form.patchValue(data.category);
    }
  }

  ngOnInit() {
    this.categories = this.data.categories || [];
    this.loadStores();
    // if editing, pre-fill store/vendor    
    if (this.data?.category?.store?._id)
      this.form.patchValue({ store: this.data.category?.store._id });
    // 🧩 When parent changes, hide/clear serviceType if needed
    this.form.get('parent')?.valueChanges.subscribe(parentId => {
      if (parentId) {
        // Has parent → clear & disable serviceType
        this.form.get('serviceType')?.setValue('');
        this.form.get('serviceType')?.disable({ emitEvent: false });
      } else {
        // No parent → enable serviceType selection
        this.form.get('serviceType')?.enable({ emitEvent: false });
      }
    });

    // 🟢 Also handle prefilled data when editing
    if (this.data?.category?.parent) {
      this.form.get('serviceType')?.disable({ emitEvent: false });
    }
  }

  /** 🔹 Load all stores */
  loadStores() {
    this.storeSvc.getMyStores().subscribe({
      next: res => (this.stores = res),
      error: () => this.notify.error('Failed to load stores')
    });

    this.form.get('store')?.valueChanges.subscribe((storeId) => {
      if (storeId) {
        this.loadParentCategories(storeId);
      } else {
        this.categories = [];
        this.form.get('parent')?.setValue('');
      }
    });

    // If editing, load categories for selected store
    if (this.data?.category?.store) {
      this.loadParentCategories(this.data.category?.store);
    }
  }

  loadParentCategories(storeId: string) {
    console.log("this.categories", this.categories);

    this.parentcategories = this.categories.filter(c => c.store._id == storeId);
    console.log("this.parentcategories", this.parentcategories);


    // ✅ Ensure parent is set after filtering is done
    const currentParentId = this.data?.category?.parent?._id || this.data?.category?.parent;
    if (currentParentId) {
      // Only set if not already set
      this.form.patchValue({ parent: currentParentId });
    }
  }

  /** 🔹 Save new or updated category */
  save() {
    const value = { ...this.form.value };
    // if (!value.slug) value.slug = value.name.toLowerCase().replace(/\s+/g, '-');
    if (!value.slug) {
      value.slug = value.name;
    }

    const request = this.data.category
      ? this.categorySvc.update(this.data?.category?._id, value)
      : this.categorySvc.create(value);

    request.subscribe({
      next: () => {
        this.notify.success(`Category ${this.data.category ? 'updated' : 'created'}`);
        this.dialogRef.close(true);
      },
      error: () => this.notify.error('Save failed')
    });
  }
}
