import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './admin-dashboard/components/sidebar/sidebar.component';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from 'projects/core/src/lib/core/interceptors/token.interceptor';
import { CoreModule } from 'projects/core/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './admin-dashboard/components/header/header.component';
import { LayoutComponent } from './admin-dashboard/components/layout/layout.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInterceptor } from 'projects/core/src/lib/core/interceptors/auth.interceptor';
import { RefreshInterceptor } from 'projects/core/src/lib/core/interceptors/refresh.interceptor';
import { ErrorInterceptor } from 'projects/core/src/lib/core/interceptors/error.interceptor';
import { BreadcrumbComponent } from './admin-dashboard/components/breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    LayoutComponent,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },   
    { provide: HTTP_INTERCEPTORS, useClass: RefreshInterceptor, multi: true },   
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }    
  ],
bootstrap: [AppComponent]
})
export class AppModule {}
