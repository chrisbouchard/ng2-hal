import {Pipe, PipeTransform} from 'angular2/core';

export interface Entry<E> {
  index: number;
  value: E;
}

@Pipe({ name: 'indexed', pure: true })
export class IndexedPipe implements PipeTransform {

  transform<E>(value: Iterable<E>): Entry<E>[] {
    if (!value) {
      return [];
    }

    return Array.from(value).map((value, index) => ({ index, value }));
  }

}

