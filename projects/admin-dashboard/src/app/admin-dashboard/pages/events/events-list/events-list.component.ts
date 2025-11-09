import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from '../event-form/event-form.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NotificationService } from 'projects/core/src/lib/core/services/notification.service';
import { VendorsService } from '../../../services/vendors.service';
import { StoresService } from '../../../services/stores.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  events: any[] = [];
  vendors: any[] = [];
  stores: any[] = [];

  total = 0;
  pageIndex = 0;
  pageSize = 10;
  loading = true;

  vendor = '';
  store = '';
  type = '';
  search = '';

  displayedColumns = ['name', 'type', 'store', 'vendor', 'price', 'status', 'actions'];

  constructor(
    private svc: EventsService,
    private vendorsSvc: VendorsService,
    private storesSvc: StoresService,
    private dialog: MatDialog,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.loadVendors();
    this.load();
  }

  /** 🔹 Load vendors for filter dropdown */
  loadVendors() {
    this.vendorsSvc.getAll().subscribe({
      next: (res) => (this.vendors = res),
      error: () => this.notify.error('Failed to load vendors')
    });
  }

  /** 🔹 When vendor changes, load its stores */
  onVendorChange() {
    this.store = '';
    if (!this.vendor) {
      this.stores = [];
      this.load();
      return;
    }

    this.storesSvc.getStoresByVendor(this.vendor).subscribe({
      next: (res) => (this.stores = res),
      error: () => this.notify.error('Failed to load stores')
    });

    this.load();
  }

  /** 🔹 Generic filter trigger */
  onFilterChange() {
    this.pageIndex = 0;
    this.load();
  }

  /** 🔹 Search by name */
  onSearch() {
    this.pageIndex = 0;
    this.load();
  }

  /** 🔹 Load events with filters */
  load() {
    this.loading = true;
    const params = {
      page: this.pageIndex + 1,
      limit: this.pageSize,
      search: this.search,
      vendor: this.vendor,
      store: this.store,
      type: this.type,
      sortField: 'createdAt'
    };
    this.svc.list(params).subscribe({
      next: (res: any) => {
        this.events = res.events || [];
        this.total = res.total || 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notify.error('Failed to load events');
      }
    });
  }

  /** 🔹 Pagination */
  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.load();
  }

  /** 🔹 Open create/edit dialog */
  openForm(ev?: any) {
    const ref = this.dialog.open(EventFormComponent, { width: '700px', data: ev || null });
    ref.afterClosed().subscribe((res) => {
      if (res) this.load();
    });
  }

  /** 🔹 Delete event */
  deleteEvent(id: string) {
    if (!confirm('Delete this event template?')) return;
    this.svc.delete(id).subscribe({
      next: () => {
        this.events = this.events.filter((e) => e._id !== id);
        this.total--;
        this.notify.success('Event deleted');
      },
      error: () => this.notify.error('Delete failed')
    });
  }

  /** 🔹 Change status directly from dropdown */
  changeStatus(ev: any, status: string) {
    this.svc.changeStatus(ev._id, status).subscribe({
      next: () => {
        ev.status = status;
        this.notify.success('Status updated');
      },
      error: () => this.notify.error('Failed to update status')
    });
  }
}
