import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoresListComponent } from './stores-list/stores-list.component';
import { StoreDetailsComponent } from './store-details/store-details.component';

const routes: Routes = [
  { path: '', component: StoresListComponent },
  { path: ':id', component: StoreDetailsComponent }
];

@NgModule({
  declarations: [StoresListComponent, StoreDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class StoresModule {}
