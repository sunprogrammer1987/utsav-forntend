import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './user-app/components/header/header.component';
import { FooterComponent } from './user-app/components/footer/footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'projects/core/src/lib/core/interceptors/token.interceptor';
import { LoaderInterceptor } from 'projects/core/src/lib/core/interceptors/loader.interceptor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from 'projects/core/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInterceptor } from 'projects/core/src/lib/core/interceptors/auth.interceptor';
import { RefreshInterceptor } from 'projects/core/src/lib/core/interceptors/refresh.interceptor';
import { ErrorInterceptor } from 'projects/core/src/lib/core/interceptors/error.interceptor';
import { SearchBarComponent } from './user-app/components/search-bar/search-bar.component';
import { CartMiniComponent } from './user-app/components/cart-mini/cart-mini.component';
import { TruncatePipe } from './user-app/utils/truncate.pipe';
import { PricePipe } from './user-app/utils/price.pipe';
import { RatingPipe } from './user-app/utils/rating.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { MobileFooterComponent } from './user-app/components/mobile-footer/mobile-footer.component';
import { ToastComponent } from './user-app/components/toast/toast.component';
import { LoaderComponent } from './user-app/components/loader/loader.component';
import { ProgressBarComponent } from './user-app/components/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ToastComponent,
    // BreadcrumbComponent,
    SearchBarComponent,
    CartMiniComponent,
    MobileFooterComponent,
    LoaderComponent,
    ProgressBarComponent,
    TruncatePipe,
    PricePipe,
    RatingPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    InfiniteScrollModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    CoreModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
