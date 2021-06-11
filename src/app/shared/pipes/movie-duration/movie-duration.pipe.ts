import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieDuration',
})
export class MovieDurationPipe implements PipeTransform {
  transform(duration): string {
    var hours = parseInt(duration);
    var minutes = Math.round((duration - hours) * 60);
    return hours + 'h ' + minutes + 'min';
  }
}
