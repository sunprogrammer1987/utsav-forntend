import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../../services/stores.service';
import { MatDialog } from '@angular/material/dialog';
import { StoresFormComponent } from '../stores-form/stores-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { StoreStateService } from '../../../services/store-state.service';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html'
})
export class StoresListComponent implements OnInit {
  stores: any[] = [];
  tempsStores: any[] = [];
  loading = false;
  displayedColumns = ['name', 'city', 'pincode', 'status', 'actions'];
  storeSub!: Subscription;
  storeId: string = 'all';

  constructor(private svc: StoresService, private storeState: StoreStateService, private dialog: MatDialog, private snack: MatSnackBar) { }

  ngOnInit() {
    this.storeSub = this.storeState.store$.subscribe(id => {
      this.storeId = id;
      this.load();
    })
  }

  load() {
    console.log("");
    
    if(this.stores.length > 0){
      if(this.storeId == 'all'){
        this.tempsStores = this.stores;
      }
      else{
        this.tempsStores = this.stores.filter(store=> store._id == this.storeId);
      }
    }
    else{
      this.loading = true;
      this.svc.getMyStores().subscribe({
        next: (res) => { this.stores = res; this.tempsStores = res;this.loading = false; },
        error: () => { this.loading = false; this.snack.open('Failed to load stores', 'Dismiss', { duration: 2000 }); }
      });
    }
  }

  addEdit(store?: any) {
    const ref = this.dialog.open(StoresFormComponent, { width: '600px', data: store || null });
    ref.afterClosed().subscribe(updated => { if (updated) this.load(); });
  }

  toggle(s: any) {
    this.svc.updateStore(s._id, { isActive: !s.isActive }).subscribe(() => this.load());
  }

  remove(s: any) {
    if (!confirm(`Delete ${s.name}?`)) return;
    // call backend delete endpoint if exists; if not, call update to mark inactive
    this.svc.updateStore(s._id, { isActive: false }).subscribe(() => this.load());
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
