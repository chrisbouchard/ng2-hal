import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name: 'map', pure: true })
export class MappedPipe implements PipeTransform {

  transform<E, T>(value: Iterable<E>, args: any[]): T[] {
    if (!value) {
      return [];
    }

    let fn: (x: E) => T;
    [fn] = args;

    return Array.from(value).map(fn);
  }

}

