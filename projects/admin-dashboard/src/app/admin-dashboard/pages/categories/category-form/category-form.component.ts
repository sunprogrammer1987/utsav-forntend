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
    image: ['']
  });

  categories: any[] = [];
  parentcategories: any[] = [];
  vendors: any[] = [];
  stores: any[] = [];
  loading = false;
  serviceType = [{ _id: 'sell', 'name': 'sell' }, { _id: 'rent', 'name': 'rent' }, { _id: 'service', 'name': 'service' }];


  imageFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categorySvc: CategoryService,
    private storeSvc: StoresService,
    private notify: NotificationService,
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.category) {
      console.log("data?.category", data?.category);
      console.log("this.form", this.form);

      this.form.patchValue(data.category);
      console.log("this.form", this.form);

      this.imagePreview = data.category?.image || null;
    }
  }

  ngOnInit() {
    this.categories = this.data.categories || [];
    this.loadStores();
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

  /** Load all stores */
  loadStores() {
    this.storeSvc.getAll().subscribe({
      next: res => (this.stores = res),
      error: () => this.notify.error('Failed to load stores')
    });

    this.form.get('store')?.valueChanges.subscribe((storeId) => {
      if (storeId) this.loadParentCategories(storeId);
      else {
        this.parentcategories = [];
        this.form.get('parent')?.setValue('');
      }
    });

    if (this.data?.category?.store) {
      this.loadParentCategories(this.data.category?.store);
    }
  }

  loadParentCategories(storeId: string) {
    this.parentcategories = this.categories.filter(c => c.store._id == storeId);

    // ✅ Ensure parent is set after filtering is done
    const currentParentId = this.data?.category?.parent?._id || this.data?.category?.parent;
    if (currentParentId) {
      // Only set if not already set
      this.form.patchValue({ parent: currentParentId });
    }
  }


  /** Handle image input change */
  onImageSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.imageFile = file;

      // preview
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  /** Upload image to server (helper) */
  uploadImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.imageFile) return resolve(this.form.value.image || '');

      const formData = new FormData();
      formData.append('file', this.imageFile);

      this.categorySvc.uploadImage(formData).subscribe({
        next: (res: any) => resolve(res.url || res.path || ''),
        error: (err) => {
          this.notify.error('Image upload failed');
          reject(err);
        }
      });
    });
  }

  /** Save new or updated category */
  async save() {
    if (this.form.invalid) {
      this.notify.error('Please fill required fields');
      return;
    }

    const value = { ...this.form.value };
    console.log("value", value);

    // Auto-slug
    // if (!value.slug) value.slug = value.name.trim().toLowerCase().replace(/\s+/g, '-');
    if (!value.slug) value.slug = value.name;

    try {
      this.loading = true;

      // 1️⃣ Upload image if new
      if (this.imageFile) {
        const uploadedUrl = await this.uploadImage();
        value.image = uploadedUrl;
      }

      // 2️⃣ Save or update category
      const request = this.data.category
        ? this.categorySvc.update(this.data.category._id, value)
        : this.categorySvc.create(value);

      request.subscribe({
        next: () => {
          this.notify.success(`Category ${this.data.category ? 'updated' : 'created'} successfully`);
          this.dialogRef.close(true);
        },
        error: () => this.notify.error('Save failed'),
        complete: () => (this.loading = false)
      });
    } catch {
      this.loading = false;
    }
  }
}
