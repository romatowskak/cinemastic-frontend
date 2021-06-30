import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesCardsListComponent } from './movies-cards-list.component';

describe('MoviesCardsListComponent', () => {
  let component: MoviesCardsListComponent;
  let fixture: ComponentFixture<MoviesCardsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesCardsListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
