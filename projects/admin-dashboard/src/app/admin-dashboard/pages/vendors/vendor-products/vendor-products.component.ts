import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/admin-dashboard/src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vendor-products',
  templateUrl: './vendor-products.component.html'
})
export class VendorProductsComponent implements OnInit {
  vendorId!: string;
  products: any[] = [];
  loading = false;
  vendor: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private snack: MatSnackBar) {}

  ngOnInit() {
    this.vendorId = this.route.snapshot.paramMap.get('id')!;
    this.loadProducts();
    this.loadVendor();
  }

  loadProducts() {
    this.loading = true;
    this.http.get<any[]>(`${environment.apiUrl}/vendors/${this.vendorId}/getProductsByvendor`).subscribe({
      next: (res) => { this.products = res; this.loading = false; },
      error: () => { this.loading = false; this.snack.open('Failed to load products', 'Dismiss', { duration: 2000 }); }
    });
  }

  loadVendor() {
    this.http.get<any>(`${environment.apiUrl}/vendors/${this.vendorId}`).subscribe({
      next: v => this.vendor = v,
      error: () => {}
    });
  }

  toggleActive(product: any) {
    this.http.put(`${environment.apiUrl}/products/${product._id}`, { isActive: !product.isActive }).subscribe({
      next: () => { this.snack.open('Product updated', 'OK', { duration: 2000 }); this.loadProducts(); },
      error: () => this.snack.open('Update failed', 'Dismiss', { duration: 2000 })
    });
  }
}
