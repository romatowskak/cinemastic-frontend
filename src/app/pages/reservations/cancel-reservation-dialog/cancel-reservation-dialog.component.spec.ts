import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelReservationDialogComponent } from './cancel-reservation-dialog.component';

describe('CancelReservationDialogComponent', () => {
  let component: CancelReservationDialogComponent;
  let fixture: ComponentFixture<CancelReservationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CancelReservationDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
