import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAssignVendorComponent } from './store-assign-vendor.component';

describe('StoreAssignVendorComponent', () => {
  let component: StoreAssignVendorComponent;
  let fixture: ComponentFixture<StoreAssignVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreAssignVendorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreAssignVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
