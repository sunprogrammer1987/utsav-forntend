import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin.service';
import { ToastService } from 'projects/user-app/src/app/user-app/services/toast.service';
import { StoresService } from '../../../services/stores.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    store: ['', Validators.required],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    discount: [0],
    stock: [0, Validators.required],
    tags: [''],
    isFeatured: [false]
  });

  stores: any[] = [];
  categories: any[] = [];
  imageFiles: File[] = [];
  previewUrls: string[] = [];
  loading = false;
  editing = false;

  constructor(
    private fb: FormBuilder,
    private admin: AdminService,
    private storeSvc: StoresService,
    private categorySvc: CategoryService,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    private toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadStores();

    if (this.data) {
      this.editing = true;
      this.form.patchValue({
        title: this.data.title,
        description: this.data.description,
        price: this.data.price,
        discount: this.data.discount,
        stock: this.data.stock,
        category: this.data.category?._id || '',
        tags: this.data.tags?.join(', ') || '',
        isFeatured: this.data.isFeatured,
        store: this.data.store?._id || this.data.store
      });
      this.previewUrls = this.data.images || [];

      // preload categories for the store
      if (this.data.store) this.onStoreChange(this.data.store._id || this.data.store);
    }
  }

  /** 🔹 Load all stores */
  loadStores() {
    this.storeSvc.getAll().subscribe({
      next: res => (this.stores = res),
      error: () => this.toast.error('Failed to load stores')
    });
  }

  /** 🔹 Load categories based on selected store */
  onStoreChange(storeId: string) {
    if (!storeId) {
      this.categories = [];
      this.form.patchValue({ category: '' });
      return;
    }

    this.categorySvc.getCategoryByIDs({ store: storeId }).subscribe({
      next: res => (this.categories = res),
      error: () => this.toast.error('Failed to load categories')
    });
  }

  onFileSelect(event: any): void {
    const files = Array.from(event.target.files) as File[];
    this.imageFiles = [...this.imageFiles, ...files];
    this.previewUrls = this.imageFiles.map(f => URL.createObjectURL(f));
  }

  removeImage(index: number): void {
    this.imageFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
  }

  submit(): void {
    if (this.form.invalid) {
      this.toast.error('Please fill all required fields.');
      return;
    }

    this.loading = true;
    const formData = new FormData();

    Object.entries(this.form.value).forEach(([key, value]) => {
      if (key === 'tags' && typeof value === 'string') {
        value.split(',').map(v => v.trim()).forEach(tag => formData.append('tags[]', tag));
      } else {
        formData.append(key, value as any);
      }
    });

    this.imageFiles.forEach(file => formData.append('images', file));

    const request$ = this.editing
      ? this.admin.updateProduct(this.data._id, formData)
      : this.admin.createProduct(formData);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.toast.success(`Product ${this.editing ? 'updated' : 'created'} successfully`);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        this.toast.error('Save failed');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
