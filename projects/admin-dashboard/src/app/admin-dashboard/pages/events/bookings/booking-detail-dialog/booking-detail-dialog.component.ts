import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-detail-dialog',
  templateUrl: './booking-detail-dialog.component.html',
  styleUrls: ['./booking-detail-dialog.component.scss']
})
export class BookingDetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public booking: any,
    public dialogRef: MatDialogRef<BookingDetailDialogComponent>
  ) {}
}
