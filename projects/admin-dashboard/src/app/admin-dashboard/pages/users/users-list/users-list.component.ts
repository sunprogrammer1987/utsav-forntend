import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserDetailDialogComponent } from '../user-detail-dialog/user-detail-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  total = 0;
  page = 1;
  limit = 20;
  loading = false;
  search = '';
  roleFilter = '';
  isActiveFilter = '';

  displayedColumns = ['name','email','role','active','createdAt','actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {
    console.log("UsersListComponentUsersListComponent");
    
  }

  ngOnInit() { this.load(); }

  load(p = 1) {
    this.loading = true;
    this.usersService.list(p, this.limit, this.search, this.roleFilter, this.isActiveFilter).subscribe({
      next: (res: any) => {
        this.users = res.users;
        this.total = res.total;
        this.page = res.page;
        this.loading = false;
      },
      error: err => {
        console.error('load users', err);
        this.loading = false;
      }
    });
  }

  onSearch() { this.load(1); }

  openCreate() {
    const ref = this.dialog.open(UserFormComponent, { width: '520px', data: null });
    ref.afterClosed().subscribe(r => { if (r) this.load(this.page); });
  }

  openEdit(user: any) {
    const ref = this.dialog.open(UserFormComponent, { width: '520px', data: user });
    ref.afterClosed().subscribe(r => { if (r) this.load(this.page); });
  }

  view(user: any) {
    this.dialog.open(UserDetailDialogComponent, { width: '520px', data: user });
  }

  toggleActive(user: any) {
    this.usersService.toggleActive(user._id).subscribe({
      next: (u: any) => {
        this.snack.open(`User ${u.isActive ? 'activated' : 'deactivated'}`, 'OK', { duration: 2000 });
        this.load(this.page);
      },
      error: err => this.snack.open('Error toggling user', 'Dismiss', { duration: 2000 })
    });
  }

  deleteUser(user: any) {
    if (!confirm(`Delete user ${user.email}? This cannot be undone.`)) return;
    this.usersService.delete(user._id).subscribe({
      next: () => {
        this.snack.open('User deleted', 'OK', { duration: 2000 });
        this.load(this.page);
      },
      error: () => this.snack.open('Delete failed', 'Dismiss', { duration: 2000 })
    });
  }

  changePage(event: any) {
    const p = event.pageIndex + 1;
    this.load(p);
  }

  exportCsv() {
    // simple CSV export from current page
    const rows = this.users.map(u => ({
      name: u.name, email: u.email, role: u.role, isActive: u.isActive, createdAt: u.createdAt
    }));
    const csv = this.toCSV(rows);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `users_${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  toCSV(rows: any[]) {
    if (!rows.length) return '';
    const header = Object.keys(rows[0]).join(',');
    const lines = rows.map(r => Object.values(r).map(v => `"${String(v).replace(/"/g,'""')}"`).join(','));
    return header + '\n' + lines.join('\n');
  }
}
