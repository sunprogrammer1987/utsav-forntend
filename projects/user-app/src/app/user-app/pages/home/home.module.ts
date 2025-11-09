import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SwiperModule } from 'swiper/angular';

const routes: Routes = [{ path: '', component: HomeComponent,data: { breadcrumb: 'Home' } }];


@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule,SwiperModule, RouterModule.forChild(routes)]
})
export class HomeModule { }