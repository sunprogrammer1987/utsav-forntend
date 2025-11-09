import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './vendor-dashboard/components/sidebar/sidebar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'projects/core/src/lib/core/interceptors/token.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from 'projects/core/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInterceptor } from 'projects/core/src/lib/core/interceptors/auth.interceptor';
import { RefreshInterceptor } from 'projects/core/src/lib/core/interceptors/refresh.interceptor';
import { ErrorInterceptor } from 'projects/core/src/lib/core/interceptors/error.interceptor';
import { HeaderComponent } from './vendor-dashboard/components/header/header.component';
import { LayoutComponent } from './vendor-dashboard/components/layout/layout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './vendor-dashboard/components/breadcrumb/breadcrumb.component';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    LayoutComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    CommonModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
