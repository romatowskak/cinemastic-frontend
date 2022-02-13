import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentryErrorsComponent } from './sentry-errors.component';

describe('SentryErrorsComponent', () => {
  let component: SentryErrorsComponent;
  let fixture: ComponentFixture<SentryErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SentryErrorsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentryErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
