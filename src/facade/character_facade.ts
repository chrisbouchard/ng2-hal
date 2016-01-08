import {Observable} from 'rxjs';
import {Aspect, Character, HIGH_CONCEPT_TAG, Skill, TROUBLE_TAG} from '../model/character';
import {CharacterTemplate, NamedAspectTemplate} from '../model/template';

export class CharacterFacade {

  private template: CharacterTemplate =
    new CharacterTemplate(
        'StarTrek', [
          new NamedAspectTemplate('high-concept', 'High Concept'),
          new NamedAspectTemplate('trouble', 'Trouble'),
          new NamedAspectTemplate('rank', 'Rank')
        ]
        );

  private amaryllis: Character =
    new Character(
        '1',
        this.template,
        'Amaryllis Aster Jennings',
        'Mary',
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
        [
          new Set([new Skill('Foo')]),
          new Set([new Skill('Bar')]),
          new Set([new Skill('Baz')])
        ]
        );

  private fooBar: Character =
    new Character(
        '2',
        this.template,
        'Foo Bar',
        undefined,
        'img/placeholder.svg',
        'blue',
        new Map<string, Aspect>([
          [HIGH_CONCEPT_TAG, new Aspect('Lorem Ipsum Dolor Sit Amen')],
          [TROUBLE_TAG, new Aspect('Troubling Troubles')]
        ]),
        new Set<Aspect>(),
        []
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

