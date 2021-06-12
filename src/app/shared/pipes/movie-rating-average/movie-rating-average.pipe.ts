import { Pipe, PipeTransform } from '@angular/core';
import { MovieRating } from '../../models/MovieRating';

@Pipe({
  name: 'movieRatingAverage',
})
export class MovieRatingAveragePipe implements PipeTransform {
  transform(ratings: MovieRating[]): number {
    const ratingValues = ratings && ratings.map((rating: MovieRating) => rating.value);
    const ratingAverage = ratingValues && ratingValues.reduce((a, b) => (a + b) / ratingValues.length);
    return ratingAverage;
  }
}
