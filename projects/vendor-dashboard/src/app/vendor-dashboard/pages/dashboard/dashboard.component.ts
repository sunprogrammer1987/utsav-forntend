import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { StoresService } from '../../services/stores.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  stores: any[] = [];
  stats: any = { stores:0, products:0, orders:0, revenue:0 };
  loading = false;

  constructor(
    private storesSvc: StoresService,
    private dashSvc: DashboardService
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.storesSvc.getMyStores().subscribe(s => {
      this.stores = s;
      this.dashSvc.getSummary().subscribe(stat => {
        this.stats = stat;
        this.loading = false;
      }, () => this.loading = false);
    }, () => this.loading = false);
  }
}
