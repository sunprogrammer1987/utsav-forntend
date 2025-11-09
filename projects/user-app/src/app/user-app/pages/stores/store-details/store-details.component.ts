import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html'
})
export class StoreDetailsComponent {
  store: any;

  constructor(private route: ActivatedRoute, private storeSvc: StoreService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.store = this.storeSvc.getStoreById(id!);
  }
}
