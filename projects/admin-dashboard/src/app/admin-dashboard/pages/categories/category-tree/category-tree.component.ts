import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { NotificationService } from 'projects/core/src/lib/core/services/notification.service';

interface CategoryNode {
  _id: string;
  name: string;
  children?: CategoryNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  _id: string;
}

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent implements OnInit {
  private _transformer = (node: CategoryNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
    _id: node._id
  });

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  loading = true;

  constructor(
    private service: CategoryService,
    private dialog: MatDialog,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.loadTree();
  }

  loadTree() {
    this.loading = true;
    this.service.getTree().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.loading = false;
        this.treeControl.expandAll(); // expand by default
      },
      error: (err) => {
        console.error('Failed to load category tree', err);
        this.loading = false;
      },
    });
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  /** Expand or collapse all */
  expandAll() {
    this.treeControl.expandAll();
  }

  collapseAll() {
    this.treeControl.collapseAll();
  }

  /** Edit category on click */
  editCategory(node: FlatNode) {
    const ref = this.dialog.open(CategoryFormComponent, {
      width: '420px',
      data: { _id: node._id, name: node.name },
    });

    ref.afterClosed().subscribe((result) => {
      if (result) this.loadTree();
    });
  }
}
