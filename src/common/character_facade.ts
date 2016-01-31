import {Observable} from 'rxjs';
import {Aspect, Character, COMMON_ASPECTS, COMMON_STRESS_TRACKS, Player, Skill, StressTrack, Stunt, Template} from './model';

export class CharacterFacade {

  private mbouchard: Player = new Player({
    id: 'mbouchard',
    name: 'Mary Bouchard'
  });

  private jdoe: Player = new Player({
    id: 'jdoe',
    name: 'John Doe'
  });

  private template: Template = new Template({
    id: 'StarTrek',
    namedAspectTemplates: [
      { field: COMMON_ASPECTS.HIGH_CONCEPT, name: 'High Concept' },
      { field: COMMON_ASPECTS.TROUBLE, name: 'Trouble' },
      { field: 'rank', name: 'Rank' }
    ],
    stressTracks: [
      { field: COMMON_STRESS_TRACKS.PHYSICAL, name: 'Physical', cap: 4 },
      { field: COMMON_STRESS_TRACKS.MENTAL, name: 'Mental', cap: 4 }
    ]
  });

  private amaryllis: Character = new Character({
    id: '1',
    template: this.template,
    name: 'Amaryllis Aster Jennings',
    player: this.mbouchard,
    portrait: require('../assets/placeholder.svg'),
    color: 'purple',
    namedAspects: new Map<string, Aspect>([
      [COMMON_ASPECTS.HIGH_CONCEPT, new Aspect('Graying Starfleet Devil')],
      [COMMON_ASPECTS.TROUBLE, new Aspect('Number One')],
      ['rank', new Aspect('Captain')]
    ]),
    unnamedAspects: new Set([
      new Aspect('To Boldly Go'),
      new Aspect('Warp Core on Legs'),
      new Aspect('Glint in the Eye')
    ]),
    skills: [
      new Set([new Skill('Foo')]),
      new Set([new Skill('Bar')]),
      new Set([new Skill('Baz')])
    ],
    stressTracks: new Map<string, StressTrack>([
      [COMMON_STRESS_TRACKS.PHYSICAL, [
        { enabled: true, marked: true },
        { enabled: true, marked: true },
        { enabled: true, marked: false },
        { enabled: true, marked: false }
      ]],
      [COMMON_STRESS_TRACKS.MENTAL, [
        { enabled: true, marked: false },
        { enabled: true, marked: false }
      ]]
    ]),
    stunts: new Set([
      {
        id: '1',
        name: 'Test Stunt',
        description: 'A stunt that tests stuff. Lorem ipsum blah blah blah. Lots of text.'
      },
      { id: '2', name: 'A B C', description: 'Foo bar.' },
      { id: '3', name: 'X Y Z', description: 'Foo bar.' }
    ])
  });

  private fooBar: Character = new Character({
    id: '2',
    template: this.template,
    name: 'Foo Bar',
    player: this.jdoe,
    portrait: require('../assets/placeholder.svg'),
    color: 'blue',
    namedAspects: new Map<string, Aspect>([
      [COMMON_ASPECTS.HIGH_CONCEPT, new Aspect('Lorem Ipsum Dolor Sit Amen')],
      [COMMON_ASPECTS.TROUBLE, new Aspect('Troubling Troubles')]
    ]),
    unnamedAspects: new Set<Aspect>(),
    skills: [],
    stressTracks: new Map<string, StressTrack>([
      [COMMON_STRESS_TRACKS.PHYSICAL, [
        { enabled: true, marked: true },
        { enabled: true, marked: true },
        { enabled: true, marked: false },
        { enabled: true, marked: false }
      ]],
      [COMMON_STRESS_TRACKS.MENTAL, [
        { enabled: true, marked: false },
        { enabled: true, marked: false }
      ]]
    ]),
    stunts: new Set<Stunt>()
  });

  private fixedCharacters: Array<Character> = [ this.amaryllis ];

  find(id: string): Observable<Character> {
    return Observable.of(this.amaryllis).delay(1);
  }

  findAll(): Observable<Array<Character>> {
    const fooBars = Array.from({length: 4}, () => this.fooBar);
    return Observable.of(this.fixedCharacters.concat(fooBars)).delay(1);
  }

}

