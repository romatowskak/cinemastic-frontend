import { TestBed, async, inject } from '@angular/core/testing';
import { CinemaAccessGuard } from './cinema-access.guard';

describe('CinemaAccessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CinemaAccessGuard],
    });
  });

  it('should ...', inject([CinemaAccessGuard], (guard: CinemaAccessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
