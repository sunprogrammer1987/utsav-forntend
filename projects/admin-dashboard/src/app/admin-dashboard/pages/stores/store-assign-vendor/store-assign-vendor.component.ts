import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoresService } from '../../../services/stores.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/admin-dashboard/src/environments/environment';

@Component({
  selector: 'app-store-assign-vendor',
  templateUrl: './store-assign-vendor.component.html'
})
export class StoreAssignVendorComponent implements OnInit {
  vendors: any[] = [];
  selectedVendor = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public store: any,
    private http: HttpClient,
    private storesService: StoresService,
    private dialogRef: MatDialogRef<StoreAssignVendorComponent>
  ) {}

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/vendors`).subscribe(res => this.vendors = res);
  }

  save() {
    if (!this.selectedVendor) return;
    this.storesService.assignVendor(this.store._id, this.selectedVendor).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
    onCancel(): void {
    this.dialogRef.close();
  }

}
