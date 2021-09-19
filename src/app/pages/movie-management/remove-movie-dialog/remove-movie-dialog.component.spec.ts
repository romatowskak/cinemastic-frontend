import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveMovieDialogComponent } from './remove-movie-dialog.component';

describe('RemoveMovieDialogComponent', () => {
  let component: RemoveMovieDialogComponent;
  let fixture: ComponentFixture<RemoveMovieDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveMovieDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveMovieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
