import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsFormComponent } from './movie-details-form.component';

describe('MovieDetailsFormComponent', () => {
  let component: MovieDetailsFormComponent;
  let fixture: ComponentFixture<MovieDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieDetailsFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
