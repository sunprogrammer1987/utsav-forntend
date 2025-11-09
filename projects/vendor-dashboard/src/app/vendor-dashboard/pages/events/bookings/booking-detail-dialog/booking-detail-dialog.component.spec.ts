import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetailDialogComponent } from './booking-detail-dialog.component';

describe('BookingDetailDialogComponent', () => {
  let component: BookingDetailDialogComponent;
  let fixture: ComponentFixture<BookingDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingDetailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
