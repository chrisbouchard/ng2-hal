import {Observable} from 'rxjs';
import {Aspect, Character} from 'app/model/character';

export class CharacterFacade {

  private amaryllis: Character =
    new Character(
        '1',
        'Amaryllis Aster Jennings',
        'img/placeholder.svg',
        'purple',
        new Set([
          new Aspect('Graying Starfleet Devil', new Set<string>(['high-concept'])),
          new Aspect('Number One', new Set<string>(['trouble'])),
          new Aspect('Captain', new Set<string>(['rank'])),
          new Aspect('To Boldly Go', new Set<string>()),
          new Aspect('Warp Core on Legs', new Set<string>()),
          new Aspect('Glint in the Eye', new Set<string>())
        ]),
        new Map<string, number>()
          .set('Foo', 1)
          .set('Bar', 2)
          .set('Baz', 3)
        );

  private fooBar: Character =
    new Character(
        '2',
        'Foo Bar',
        'img/placeholder.svg',
        'blue',
        new Set([
          new Aspect('Lorem Ipsum Dolor Sit Amen', new Set<string>(['high-concept'])),
          new Aspect('Troubling Troubles', new Set<string>(['trouble']))
        ]),
        new Map<string, number>()
        );

  fixedCharacters: Character[] = [ this.amaryllis ];

  find(id: string): Observable<Character> {
    return Observable.of(this.amaryllis);
  }

  findAll(): Observable<Character[]> {
    var fooBars = Array.from({length: 4}, () => this.fooBar);
    return Observable.of(this.fixedCharacters.concat(fooBars));
  }

}

