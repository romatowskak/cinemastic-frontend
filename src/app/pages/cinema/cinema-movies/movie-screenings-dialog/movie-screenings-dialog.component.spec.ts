import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieScreeningsDialogComponent } from './movie-screenings-dialog.component';

describe('MovieScreeningsDialogComponent', () => {
  let component: MovieScreeningsDialogComponent;
  let fixture: ComponentFixture<MovieScreeningsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieScreeningsDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieScreeningsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
