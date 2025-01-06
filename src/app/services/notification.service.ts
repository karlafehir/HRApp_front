import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string, type: 'success' | 'error') {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: type === 'success' ? 'snack-bar-success' : 'snack-bar-error',
      horizontalPosition: 'center',
      verticalPosition: 'top', 
    };

    this.snackBar.open(message, '', config); 
  }
}
