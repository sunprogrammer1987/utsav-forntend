import { Component, OnInit } from '@angular/core';
import { BreadcrumbService, BreadcrumbItem } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  items: BreadcrumbItem[] = [];

  constructor(private breadcrumbSvc: BreadcrumbService) {}

  ngOnInit(): void {
    this.items = this.breadcrumbSvc.getBreadcrumbs();
  }
}
