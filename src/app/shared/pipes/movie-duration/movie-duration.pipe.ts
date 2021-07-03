import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieDuration',
})
export class MovieDurationPipe implements PipeTransform {
  transform(duration: number): string {
    const hours = duration && duration.toFixed();
    const minutes = Math.round((duration - +hours) * 60);
    return hours + 'h ' + minutes + 'm';
  }
}
