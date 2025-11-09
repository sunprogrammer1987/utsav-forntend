import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public order: any,
    public dialogRef: MatDialogRef<OrderDetailDialogComponent>
  ) {}
}
