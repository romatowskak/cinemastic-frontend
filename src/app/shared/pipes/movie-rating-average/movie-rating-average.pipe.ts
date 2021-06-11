import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieRatingAverage'
})
export class MovieRatingAveragePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
