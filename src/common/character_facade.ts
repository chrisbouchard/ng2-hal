import {Observable} from 'rxjs';
import {Aspect, Character, Consequence, COMMON_ASPECTS, COMMON_CONSEQUENCES, COMMON_STRESS_TRACKS, Player, Skill,
    StressTrack, Stunt, Template} from './model';

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
    id: '1',
    name: 'Star Trek',
    aspectNames: new Map([
      [ COMMON_ASPECTS.HIGH_CONCEPT, 'High Concept' ],
      [ COMMON_ASPECTS.TROUBLE, 'Trouble' ],
      [ 'rank', 'Rank' ]
    ]),
    consequenceNames: new Map([
      [ COMMON_CONSEQUENCES.MILD, 'Mild' ],
      [ COMMON_CONSEQUENCES.MODERATE, 'Moderate' ],
      [ COMMON_CONSEQUENCES.SEVERE, 'Severe' ],
      [ COMMON_CONSEQUENCES.EXTREME, 'Extreme' ]
    ]),
    stressTrackNames: new Map([
      [ COMMON_STRESS_TRACKS.PHYSICAL, 'Physical' ],
      [ COMMON_STRESS_TRACKS.MENTAL, 'Mental' ]
    ]),

    aspectSlots: [
      COMMON_ASPECTS.HIGH_CONCEPT,
      COMMON_ASPECTS.TROUBLE,
      'rank'
    ],
    consequenceSlots: [
      COMMON_CONSEQUENCES.MILD,
      COMMON_CONSEQUENCES.MODERATE,
      COMMON_CONSEQUENCES.SEVERE,
      COMMON_CONSEQUENCES.EXTREME
    ],
    stressTrackSlots: [
      { field: COMMON_STRESS_TRACKS.PHYSICAL, cap: 4 },
      { field: COMMON_STRESS_TRACKS.MENTAL, cap: 4 }
    ]
  });

  private amaryllis: Character = new Character({
    id: '1',
    template: this.template,
    name: 'Amaryllis Aster Jennings',
    player: this.mbouchard,
    portrait: require<string>('../assets/placeholder.svg'),
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
    consequences: new Map<string, Set<Consequence>>([
      [COMMON_CONSEQUENCES.MILD, new Set([
        {}, {type: COMMON_STRESS_TRACKS.PHYSICAL}, {type: COMMON_STRESS_TRACKS.MENTAL}
      ])],
      [COMMON_CONSEQUENCES.MODERATE, new Set([ {} ])],
      [COMMON_CONSEQUENCES.SEVERE, new Set([ {} ])],
      [COMMON_CONSEQUENCES.EXTREME, new Set([ {} ])],
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
    portrait: require<string>('../assets/placeholder.svg'),
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
    consequences: new Map<string, Set<Consequence>>([
      [COMMON_CONSEQUENCES.MILD, new Set([ {} ])],
      [COMMON_CONSEQUENCES.MODERATE, new Set([ {} ])],
      [COMMON_CONSEQUENCES.SEVERE, new Set([ {} ])],
      [COMMON_CONSEQUENCES.EXTREME, new Set([ {} ])],
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

