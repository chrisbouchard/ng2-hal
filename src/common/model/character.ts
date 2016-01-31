import {Aspect, COMMON_ASPECTS} from './aspect';
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

    skills: Array<Set<Skill>>;
    stunts: Set<Stunt>;

    stressTracks: Map<string, StressTrack>;
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

  skills: Array<Set<Skill>>;
  stunts: Set<Stunt>;

  stressTracks: Map<string, StressTrack>;

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

