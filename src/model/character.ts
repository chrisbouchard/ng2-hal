import {CharacterTemplate} from './template.ts';

export class Aspect {
  constructor(public name: string) {}
}

export class Skill {
  constructor(public name: string) {}
}

export const HIGH_CONCEPT_TAG = 'high-concept';
export const TROUBLE_TAG = 'trouble';

export class Character {
  constructor(
    public id: string,
    public template: CharacterTemplate,
    public name: string,
    public player: string,
    public portrait: string,
    public color: string,
    public namedAspects: Map<string, Aspect>,
    public unnamedAspects: Set<Aspect>,
    public skills: Array<Set<Skill>>
  ) {}

  public get aspects(): Set<Aspect> {
    const aspects = new Set<Aspect>();

    this.namedAspects.forEach(aspect => aspects.add(aspect));
    this.unnamedAspects.forEach(aspect => aspects.add(aspect));

    return aspects;
  }

  public get highConcept(): Aspect {
    return this.namedAspects.get(HIGH_CONCEPT_TAG);
  }

  public get trouble(): Aspect {
    return this.namedAspects.get(TROUBLE_TAG);
  }
}

