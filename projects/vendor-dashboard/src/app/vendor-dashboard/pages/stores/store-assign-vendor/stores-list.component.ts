import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/vendor-dashboard/src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.scss']
})
export class StoresListComponent implements OnInit {
  stores: any[] = [];
  loading = false;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  ngOnInit() { this.loadStores(); }

  loadStores() {
    this.loading = true;
    this.http.get(`${environment.apiUrl}/stores`).subscribe({
      next: (res: any) => {
        this.stores = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snack.open('Failed to load stores', 'Dismiss', { duration: 2000 });
      }
    });
  }

  toggleStore(store: any) {
    this.http.put(`${environment.apiUrl}/stores/${store._id}/toggle`, {}).subscribe({
      next: (res: any) => {
        store.isActive = res.isActive;
        this.snack.open(`Store ${res.isActive ? 'activated' : 'deactivated'}`, 'OK', { duration: 2000 });
      }
    });
  }
}
