import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html'
})
export class StoresListComponent implements OnInit {
  stores: any[] = [];
  constructor(private storeSvc: StoreService) {}

  ngOnInit() {
    this.stores = this.storeSvc.getAllStores();
  }
}
