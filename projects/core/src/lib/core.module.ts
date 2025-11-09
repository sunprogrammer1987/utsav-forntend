import { NgModule } from '@angular/core';
import { CoreComponent } from './core.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  exports: [
    CoreComponent,HttpClientModule
  ]
})
export class CoreModule { }
