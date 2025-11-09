import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { LucideAngularModule, ChevronRight, Menu, Moon, Sun } from 'lucide-angular';
import { SharedModule } from '../../shared.module';
@NgModule({
  declarations: [ProductListComponent],
  imports: [CommonModule,SharedModule, ProductsRoutingModule,FormsModule,MatSnackBarModule,MatIconModule,LucideAngularModule.pick({ ChevronRight, Menu, Moon, Sun })
]
})
export class ProductsModule { }