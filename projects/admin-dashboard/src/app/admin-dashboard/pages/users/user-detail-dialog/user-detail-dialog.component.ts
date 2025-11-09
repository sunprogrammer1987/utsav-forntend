import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html'
})
export class UserDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public user: any) {}
}
