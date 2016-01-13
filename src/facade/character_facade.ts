import {Observable} from 'rxjs';
import {Aspect, Character, COMMON_ASPECTS, COMMON_STRESS_TRACKS, Skill, StressTrack} from '../model/character';
import {Player} from '../model/player';
import {CharacterTemplate, NamedAspectTemplate, StressTrackTemplate} from '../model/template';

export class CharacterFacade {

  private template: CharacterTemplate =
    new CharacterTemplate(
        'StarTrek', [
          new NamedAspectTemplate(COMMON_ASPECTS.HIGH_CONCEPT, 'High Concept'),
          new NamedAspectTemplate(COMMON_ASPECTS.TROUBLE, 'Trouble'),
          new NamedAspectTemplate('rank', 'Rank')
        ], [
          new StressTrackTemplate(COMMON_STRESS_TRACKS.PHYSICAL, 'Physical', 4),
          new StressTrackTemplate(COMMON_STRESS_TRACKS.MENTAL, 'Mental', 4),
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
          [COMMON_ASPECTS.HIGH_CONCEPT, new Aspect('Graying Starfleet Devil')],
          [COMMON_ASPECTS.TROUBLE, new Aspect('Number One')],
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
          [COMMON_STRESS_TRACKS.PHYSICAL, [true, true, false, false]],
          [COMMON_STRESS_TRACKS.MENTAL, [false, false]]
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
          [COMMON_ASPECTS.HIGH_CONCEPT, new Aspect('Lorem Ipsum Dolor Sit Amen')],
          [COMMON_ASPECTS.TROUBLE, new Aspect('Troubling Troubles')]
        ]),
        new Set<Aspect>(),
        [],
        new Map<string, StressTrack>([
          [COMMON_STRESS_TRACKS.PHYSICAL, [true, true, false, false]],
          [COMMON_STRESS_TRACKS.MENTAL, [false, false]]
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

