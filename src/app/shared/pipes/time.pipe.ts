import { Pipe, PipeTransform } from '@angular/core';
import { secondsToMinutes } from 'date-fns';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(time: number): string {
    let minutes: number | string = secondsToMinutes(time);
    minutes = minutes > 9 ? minutes : `0${minutes}`
    let seconds : number | string = time%60;
    seconds = seconds > 9 ? seconds : `0${seconds}`

    return `${minutes}:${seconds}`
  }
}
