import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CinemaAuditoriumComponent } from './cinema-auditorium.component';

describe('CinemaAuditoriumComponent', () => {
  let component: CinemaAuditoriumComponent;
  let fixture: ComponentFixture<CinemaAuditoriumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CinemaAuditoriumComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaAuditoriumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
