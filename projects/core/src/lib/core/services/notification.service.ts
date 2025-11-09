import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snack: MatSnackBar) {}

  private defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['snackbar-default']
  };
  
  success(msg: string) {
    this.snack.open(msg, 'Close', {
      ...this.defaultConfig,
      panelClass: ['snackbar-success']
    });
  }

  error(msg: string) {
    this.snack.open(msg, 'Close', {
      ...this.defaultConfig,
      panelClass: ['snackbar-error']
    });
  }

  warning(msg: string) {
    this.snack.open(msg, 'Close', {
      ...this.defaultConfig,
      panelClass: ['snackbar-warning']
    });
  }

  info(msg: string) {
    this.snack.open(msg, 'Close', {
      ...this.defaultConfig,
      panelClass: ['snackbar-info']
    });
  }
}
