import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: CheckoutComponent }];


@NgModule({
  declarations: [CheckoutComponent],
  imports: [CommonModule, ReactiveFormsModule,FormsModule, RouterModule.forChild(routes)]
})
export class CheckoutModule { }