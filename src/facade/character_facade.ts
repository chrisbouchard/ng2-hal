import {Observable} from 'rxjs';
import {Aspect, Character, HIGH_CONCEPT_TAG, TROUBLE_TAG} from '../model/character';

export class CharacterFacade {

  private amaryllis: Character =
    new Character(
        '1',
        'Amaryllis Aster Jennings',
        'img/placeholder.svg',
        'purple',
        new Map<string, Aspect>([
          [HIGH_CONCEPT_TAG, new Aspect('Graying Starfleet Devil')],
          [TROUBLE_TAG, new Aspect('Number One')],
          ['rank', new Aspect('Captain')]
        ]),
        new Set([
          new Aspect('To Boldly Go'),
          new Aspect('Warp Core on Legs'),
          new Aspect('Glint in the Eye')
        ]),
        new Map<string, number>([
          ['Foo', 1],
          ['Bar', 2],
          ['Baz', 3]
        ])
        );

  private fooBar: Character =
    new Character(
        '2',
        'Foo Bar',
        'img/placeholder.svg',
        'blue',
        new Map<string, Aspect>([
          [HIGH_CONCEPT_TAG, new Aspect('Lorem Ipsum Dolor Sit Amen')],
          [TROUBLE_TAG, new Aspect('Troubling Troubles')]
        ]),
        new Set<Aspect>(),
        new Map<string, number>()
        );

  private fixedCharacters: Array<Character> = [ this.amaryllis ];

  find(id: string): Observable<Character> {
    return Observable.of(this.amaryllis).delay(1);
  }

  findAll(): Observable<Array<Character>> {
    const fooBars = Array.from({length: 4}, () => this.fooBar);
    return Observable.of(this.fixedCharacters.concat(fooBars)).delay(1);
  }

}

