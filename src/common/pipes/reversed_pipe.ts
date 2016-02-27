import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name: 'reversed', pure: true })
export class ReversedPipe implements PipeTransform {

  transform<E>(value: E[]): E[] {
    if (!value) {
      return [];
    }

    let copy = Array.from(value);
    copy.reverse();
    return copy;
  }

}


