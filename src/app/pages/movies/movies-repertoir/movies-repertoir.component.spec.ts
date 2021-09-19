import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesRepertoirComponent } from './movies-repertoir.component';

describe('MoviesRepertoirComponent', () => {
  let component: MoviesRepertoirComponent;
  let fixture: ComponentFixture<MoviesRepertoirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesRepertoirComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesRepertoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
