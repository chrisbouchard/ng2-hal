import {Player} from './player';
import {CharacterTemplate} from './template';

export class Aspect {
  constructor(public name: string) {}
}

export class Skill {
  constructor(public name: string) {}
}

export type StressTrack = Array<boolean>;

export class Stunt {
  constructor(public name: string, public description: string) {};
}

export const COMMON_ASPECTS = {
  HIGH_CONCEPT: 'high-concept',
  TROUBLE: 'trouble'
};

export const COMMON_STRESS_TRACKS = {
  PHYSICAL: 'physical',
  MENTAL: 'mental'
}

export class Character {
  constructor(
    public id: string,
    public template: CharacterTemplate,
    public name: string,
    public player: Player,
    public portrait: string,
    public color: string,
    public namedAspects: Map<string, Aspect>,
    public unnamedAspects: Set<Aspect>,
    public skills: Array<Set<Skill>>,
    public stressTracks: Map<string, StressTrack>,
    public stunts: Set<Stunt>
  ) {}

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

