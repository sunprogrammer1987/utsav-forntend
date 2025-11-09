import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendorsRoutingModule } from './vendors-routing.module';

import { VendorsListComponent } from './vendors-list/vendors-list.component';
import { VendorDetailDialogComponent } from './vendor-detail-dialog/vendor-detail-dialog.component';
import { VendorProductsComponent } from './vendor-products/vendor-products.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    VendorsListComponent,
    VendorDetailDialogComponent,
    VendorProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    VendorsRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ]
})
export class VendorsModule {}
