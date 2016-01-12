import {Observable} from 'rxjs';
import {Aspect, Character, HIGH_CONCEPT_TAG, MENTAL_TAG, PHYSICAL_TAG, Skill, StressTrack, TROUBLE_TAG} from '../model/character';
import {Player} from '../model/player';
import {CharacterTemplate, NamedAspectTemplate, StressTrackTemplate} from '../model/template';

export class CharacterFacade {

  private template: CharacterTemplate =
    new CharacterTemplate(
        'StarTrek', [
          new NamedAspectTemplate(HIGH_CONCEPT_TAG, 'High Concept'),
          new NamedAspectTemplate(TROUBLE_TAG, 'Trouble'),
          new NamedAspectTemplate('rank', 'Rank')
        ], [
          new StressTrackTemplate(PHYSICAL_TAG, 'Physical', 4),
          new StressTrackTemplate(MENTAL_TAG, 'Mental', 4),
        ]
        );

  private amaryllis: Character =
    new Character(
        '1',
        this.template,
        'Amaryllis Aster Jennings',
        new Player('mbouchard', 'Mary Bouchard'),
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
        ],
        new Map<string, StressTrack>([
          [PHYSICAL_TAG, [true, true, false, false]],
          [MENTAL_TAG, [false, false]]
        ])
        );

  private fooBar: Character =
    new Character(
        '2',
        this.template,
        'Foo Bar',
        new Player('jdoe', 'John Doe'),
        'img/placeholder.svg',
        'blue',
        new Map<string, Aspect>([
          [HIGH_CONCEPT_TAG, new Aspect('Lorem Ipsum Dolor Sit Amen')],
          [TROUBLE_TAG, new Aspect('Troubling Troubles')]
        ]),
        new Set<Aspect>(),
        [],
        new Map<string, StressTrack>([
          [PHYSICAL_TAG, [true, true, false, false]],
          [MENTAL_TAG, [false, false]]
        ])
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

