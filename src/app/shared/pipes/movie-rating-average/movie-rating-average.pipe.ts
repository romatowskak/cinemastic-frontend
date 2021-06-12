import { Pipe, PipeTransform } from '@angular/core';
import { MovieRating } from '../../models/MovieRating';

@Pipe({
  name: 'movieRatingAverage',
})
export class MovieRatingAveragePipe implements PipeTransform {
  transform(ratings: MovieRating[]): string {
    const ratingValues = ratings && ratings.map((rating: MovieRating) => rating.value);
    const ratingAverage = ratingValues && ratingValues.length ? ratingValues.reduce((a, b) => (a + b) / ratingValues.length) : 0;
    return ratingAverage.toFixed(1);
  }
}
