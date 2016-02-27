import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name: 'range', pure: true })
export class RangePipe implements PipeTransform {

  transform(value: number): number[] {
    if (!value) {
      return [];
    }

    return Array.from({length: value}).map((value, index) => index);
  }

}


