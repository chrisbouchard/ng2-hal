import {Aspect, COMMON_ASPECTS} from './aspect';
import {Consequence} from './consequence';
import {Player} from './player';
import {Skill} from './skill';
import {COMMON_STRESS_TRACKS, StressTrack} from './stress_track';
import {Stunt} from './stunt';
import {Template} from './template';

module Character {
  export interface Options {
    id: string;
    name: string;

    player: Player;
    template: Template;

    color: string;
    portrait: string;

    namedAspects: Map<string, Aspect>;
    unnamedAspects: Set<Aspect>;

    skills: Set<Skill>[];
    stunts: Set<Stunt>;

    stressTracks: Map<string, StressTrack>;

    consequences: Map<string, Set<Consequence>>;
  }
}

export class Character implements Character.Options {
  id: string;
  name: string;

  player: Player;
  template: Template;

  color: string;
  portrait: string;

  namedAspects: Map<string, Aspect>;
  unnamedAspects: Set<Aspect>;

  skills: Set<Skill>[];
  stunts: Set<Stunt>;

  stressTracks: Map<string, StressTrack>;

  consequences: Map<string, Set<Consequence>>;

  constructor(options: Character.Options) {
    Object.assign(this, options);
  }

  public get aspects(): Set<Aspect> {
    const aspects = new Set<Aspect>();

    this.namedAspects.forEach(aspect => aspects.add(aspect));
    this.unnamedAspects.forEach(aspect => aspects.add(aspect));

    return aspects;
  }

  public get highConcept(): Aspect {
    return this.namedAspects.get(COMMON_ASPECTS.HIGH_CONCEPT);
  }

  public get trouble(): Aspect {
    return this.namedAspects.get(COMMON_ASPECTS.TROUBLE);
  }
}

