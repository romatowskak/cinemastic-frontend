import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieManagingPanelComponent } from './movie-managing-panel.component';

describe('MovieManagingPanelComponent', () => {
  let component: MovieManagingPanelComponent;
  let fixture: ComponentFixture<MovieManagingPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieManagingPanelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieManagingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
