import { Component, EventEmitter, OnInit,Output } from '@angular/core';
import { StoresService } from '../../services/stores.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StoreStateService } from '../../services/store-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  stores: any[] = [];
  activeStoreId: string | 'all' = 'all';
  darkMode: boolean = false;
@Output() toggleSidebar = new EventEmitter<void>();
  constructor(
    private storesSvc: StoresService,
    private auth: AuthService,
    private storeState: StoreStateService,
    private router: Router
  ) { }

  ngOnInit() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.darkMode = true;
      document.documentElement.classList.add('dark');
    }
    this.storesSvc.getMyStores().subscribe({
      next: (s) => {
        this.stores = s;
        const saved = localStorage.getItem('vendor_active_store');
        if (saved && (saved === 'all' || this.stores.some(x => x._id === saved))) {
          this.activeStoreId = saved;
        } else {
          this.activeStoreId = 'all';
          localStorage.setItem('vendor_active_store', 'all');
        }
        this.storeState.setActiveStore(this.activeStoreId); // ✅ Sync initial value
      }
    });
  }

  onStoreChange() {
    this.storeState.setActiveStore(this.activeStoreId); // ✅ Broadcast to all listeners
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
  toggleTheme() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}
 }
