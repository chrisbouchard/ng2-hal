import {Pipe, PipeTransform} from 'angular2/core';

export interface Entry<K, V> {
  key: K;
  value: V;
}

@Pipe({ name: 'entries', pure: true })
export class EntriesPipe implements PipeTransform {

  transform<K, V>(value: Map<K, V>): Entry<K, V>[] {
    if (!value) {
      return [];
    }

    return Array.from(value).map(entry => ({ key: entry[0], value: entry[1] }));
  }

}

