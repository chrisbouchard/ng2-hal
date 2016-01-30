import {Aspect, COMMON_ASPECTS} from './aspect';
import {Player} from './player';
import {Skill} from './skill';
import {COMMON_STRESS_TRACKS, StressTrack} from './stress_track';
import {Stunt} from './stunt';
import {Template} from './template';

module Character {
  export interface Options {
    id: string;
    color: string;
    name: string;
    namedAspects: Map<string, Aspect>;
    player: Player;
    portrait: string;
    skills: Array<Set<Skill>>;
    stressTracks: Map<string, StressTrack>;
    stunts: Set<Stunt>;
    template: Template;
    unnamedAspects: Set<Aspect>;
  }
}

export class Character implements Character.Options {
  id: string;
  color: string;
  name: string;
  namedAspects: Map<string, Aspect>;
  player: Player;
  portrait: string;
  skills: Array<Set<Skill>>;
  stressTracks: Map<string, StressTrack>;
  stunts: Set<Stunt>;
  template: Template;
  unnamedAspects: Set<Aspect>;

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

