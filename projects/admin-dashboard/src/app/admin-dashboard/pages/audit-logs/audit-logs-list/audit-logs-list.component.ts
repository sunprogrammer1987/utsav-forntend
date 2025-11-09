import { Component, OnInit, ViewChild } from '@angular/core';
import { AuditLogsService } from '../../../services/audit-logs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-audit-logs-list',
  templateUrl: './audit-logs-list.component.html',
  styleUrls: ['./audit-logs-list.component.scss']
})
export class AuditLogsListComponent implements OnInit {
  logs: any[] = [];
  loading = false;
  // filters
  actionFilter = '';
  entityTypeFilter = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;

  // pagination (server-side if implemented)
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  page = 1;
  limit = 50;

  displayedColumns = ['action', 'performedBy', 'entityType', 'entityId', 'details', 'createdAt'];

  constructor(private svc: AuditLogsService, private snack: MatSnackBar) {}

  ngOnInit() {
    this.load();
  }

  load(page = 1) {
    this.loading = true;
    this.page = page;
    const params: any = { page: String(this.page), limit: String(this.limit) };
    if (this.actionFilter) params.action = this.actionFilter;
    if (this.entityTypeFilter) params.entityType = this.entityTypeFilter;
    if (this.fromDate) params.from = this.fromDate.toISOString();
    if (this.toDate) params.to = this.toDate.toISOString();

    this.svc.list(params).subscribe({
      next: (res: any) => {
        // if server returns {logs, total, page} handle that, otherwise treat res as array
        if (res.logs) {
          this.logs = res.logs;
        } else if (Array.isArray(res)) {
          this.logs = res;
        } else {
          this.logs = res.data ?? [];
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Failed to load logs', 'Dismiss', { duration: 2000 });
        this.loading = false;
      }
    });
  }

  clearFilters() {
    this.actionFilter = '';
    this.entityTypeFilter = '';
    this.fromDate = null;
    this.toDate = null;
    this.load(1);
  }

  // exportCSV() {
  //   if (!this.logs.length) return this.snack.open('No logs to export', 'OK', { duration: 2000 });
  //   const rows = this.logs.map(l => ({
  //     action: l.action,
  //     performedBy: l.performedBy?.email || l.performedBy,
  //     entityType: l.entityType,
  //     entityId: l.entityId,
  //     details: typeof l.details === 'object' ? JSON.stringify(l.details) : l.details,
  //     createdAt: new Date(l.createdAt).toLocaleString()
  //   }));
  //   const worksheet = XLSX.utils.json_to_sheet(rows);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'AuditLogs');
  //   const wbout = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
  //   const blob = new Blob([wbout], { type: 'text/csv' });
  //   saveAs(blob, `audit_logs_${Date.now()}.csv`);
  // }

  // exportPDF() {
  //   if (!this.logs.length) return this.snack.open('No logs to export', 'OK', { duration: 2000 });
  //   const doc = new jsPDF();
  //   doc.text('Audit Logs', 14, 16);
  //   const rows = this.logs.map(l => [
  //     l.action,
  //     l.performedBy?.email || '-',
  //     l.entityType,
  //     l.entityId,
  //     typeof l.details === 'object' ? JSON.stringify(l.details) : l.details,
  //     new Date(l.createdAt).toLocaleString()
  //   ]);
  //   autoTable(doc, {
  //     head: [['Action', 'By', 'Entity', 'Entity ID', 'Details', 'When']],
  //     body: rows,
  //     startY: 22,
  //     styles: { fontSize: 8 }
  //   });
  //   doc.save(`audit_logs_${Date.now()}.pdf`);
  // }
}
