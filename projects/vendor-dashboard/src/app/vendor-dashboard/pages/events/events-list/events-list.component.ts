import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from '../event-form/event-form.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { NotificationService } from 'projects/core/src/lib/core/services/notification.service';
import { Subscription } from 'rxjs';
import { StoreStateService } from '../../../services/store-state.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  events: any[] = [];
  total = 0;
  pageIndex = 0;
  pageSize = 10;
  loading = true;
  search = '';
  type = '';
  storeSub!: Subscription;
  storeId: string = 'all';

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private svc: EventsService, private storeState: StoreStateService, private dialog: MatDialog, private notify: NotificationService) { }

  ngOnInit() {
    this.storeSub = this.storeState.store$.subscribe(id => {
      this.storeId = id;
      this.load();
    });
  }

  load() {
    this.loading = true;
    const params = {
      page: this.pageIndex + 1,
      limit: this.pageSize,
      search: this.search,
      type: this.type,
      store: this.storeId,
      sortField: 'createdAt'
    };
    this.svc.list(params).subscribe({
      next: (res: any) => { this.events = res.events || []; this.total = res.total || 0; this.loading = false; },
      error: () => { this.loading = false; this.notify.error('Failed to load events'); }
    });
  }

  onSearch() { this.pageIndex = 0; this.load(); }
  onPage(e: PageEvent) { this.pageIndex = e.pageIndex; this.pageSize = e.pageSize; this.load(); }
  onSortChange(sort: Sort) { /* implement if server supports */ }

  openForm(ev?: any) {
    const ref = this.dialog.open(EventFormComponent, { width: '700px', data: ev || null });
    ref.afterClosed().subscribe(res => { if (res) this.load(); });
  }

  deleteEvent(id: string) {
    if (!confirm('Delete this event template?')) return;
    this.svc.delete(id).subscribe({
      next: () => { this.events = this.events.filter(e => e._id !== id); this.total--; this.notify.success('Deleted'); },
      error: () => this.notify.error('Delete failed')
    });
  }

  changeStatus(ev: any, status: string) {
    this.svc.changeStatus(ev._id, status).subscribe({
      next: () => { ev.status = status; this.notify.success('Status updated'); },
      error: () => this.notify.error('Failed to update status')
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
