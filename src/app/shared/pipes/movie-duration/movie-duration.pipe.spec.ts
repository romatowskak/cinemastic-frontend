import { MovieDurationPipe } from './movie-duration.pipe';

describe('MovieDurationPipe', () => {
  it('create an instance', () => {
    const pipe = new MovieDurationPipe();
    expect(pipe).toBeTruthy();
  });
});
