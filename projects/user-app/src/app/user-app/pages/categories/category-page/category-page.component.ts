import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoriesComponent implements OnInit {
  category: any = null;
  categories: any[] = [];
  showAll = false;
  serviceType: string | null = null;
  breadcrumbItems: any[] = [];
  isMobile = false;
  constructor(
    private route: ActivatedRoute,
    private categorySvc: CategoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (params.get('serviceType')) {
        this.serviceType = params.get('serviceType');
      }
      this.route.queryParamMap.subscribe(qParams => {
        if (qParams.get('type')) {
          this.serviceType = qParams.get('type');
        }
        this.loadCategories(slug, this.serviceType);
        this.updateBreadcrumb(this.serviceType);
      });
    });
  }

  checkMobile() {
    this.isMobile = window.innerWidth < 1024;
  }


  loadCategories(slug: string | null, type: string | null): void {
    this.categorySvc.getCategoryTreeByserviceType(type).subscribe({
      next: (cats) => {
        let filteredCats = cats;

        // ✅ Filter by serviceType if query param is given
        if (type) {
          filteredCats = cats.filter(c => c.serviceType === type);
        }

        if (slug) {
          // ✅ Single category view
          this.category = filteredCats.find(c => c.slug === slug);
          this.showAll = false;

          this.breadcrumbItems = [
            { label: 'Home', link: '/' },
            { label: 'Categories', link: '/categories' },
            { label: this.category?.name || '' }
          ];
        } else {
          console.log("eleseeeeeee");

          // ✅ All categories (optionally filtered by type)
          this.categories = filteredCats;
          this.category = null;
          this.showAll = true;

          this.breadcrumbItems = [
            { label: 'Home', link: '/', icon: 'fa fa-home' },
            { label: 'Categories', link: '/categories', icon: 'fa fa-layer-group' },
            ...(type ? [{ label: type.toUpperCase() }] : [])
          ];
        }
      },
      error: (err) => console.error('Error loading categories', err)
    });
  }

  setType(type: string | null) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { type: type || null },
      queryParamsHandling: 'merge', // preserves other params like slug
    });
  }

  updateBreadcrumb(type: string | null) {
    const typeLabel = type
      ? type.charAt(0).toUpperCase() + type.slice(1)
      : 'All';

    this.breadcrumbItems = [
      { label: 'Home', link: '/' },
      { label: 'Categories', link: '/categories' },
      { label: typeLabel }
    ];
  }

}
