import { MovieRatingAveragePipe } from './movie-rating-average.pipe';

describe('MovieRatingAveragePipe', () => {
  it('create an instance', () => {
    const pipe = new MovieRatingAveragePipe();
    expect(pipe).toBeTruthy();
  });
});
