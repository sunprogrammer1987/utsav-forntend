import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface BreadcrumbItem {
  label: string;
  link?: string;
  icon?: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  breadcrumbs: BreadcrumbItem[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.buildOnNavigation();
  }

  /** Automatically rebuild breadcrumb on navigation */
  private buildOnNavigation() {
    console.log("buildOnNavigation");    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.route.root);
      });
  }

  /** Recursively build breadcrumb from route tree */
  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbItem[] = []): BreadcrumbItem[] {
    console.log("createBreadcrumbs");    

    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      // Get readable label
      let label = child.snapshot.data['breadcrumb'] || routeURL;
      label = this.formatLabel(label);

      if (label) {
        breadcrumbs.push({
          label,
          link: url,
          icon: this.getIconForRoute(label.toLowerCase())
        });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  /** Format route name (e.g. chairs → Chairs) */
  private formatLabel(label: string): string {
    console.log("formatLabel");    

    if (!label) return '';
    label = decodeURIComponent(label);
    return label.charAt(0).toUpperCase() + label.slice(1).replace(/-/g, ' ');
  }

  /** Optional: choose icons based on route keyword */
  private getIconForRoute(label: string): string {
    console.log("getIconForRoute");   

    if (label.includes('home')) return 'fa fa-home';
    if (label.includes('category')) return 'fa fa-layer-group';
    if (label.includes('product')) return 'fa fa-cube';
    return 'fa fa-folder';
  }

  /** Public getter */
  getBreadcrumbs(): BreadcrumbItem[] {
    console.log("getBreadcrumbs");    

    return [{ label: 'Home', link: '/', icon: 'fa fa-home' }, ...this.breadcrumbs];
  }
}
