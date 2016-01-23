import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name: 'sorted', pure: true })
export class SortedPipe implements PipeTransform {

  transform<T>(value: Iterable<T>, args: Array<any>): Array<T> {
    if (!value) return [];

    let array = Array.from(value);

    let key: string;
    let reversed: boolean;

    [key, reversed] = args;

    if (key) {
      array.sort((a: any, b: any) => {
        if (a[key] < b[key])
          return reversed ? 1 : -1;
        if (a[key] > b[key])
          return reversed ? -1 : 1;
        return 0;
      });
    }
    else {
      array.sort();
    }

    return array;
  }

}


