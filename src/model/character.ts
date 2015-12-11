export class Aspect {
  constructor(
    public name: string,
    public tags: Set<string>
  ) {}
}

export class Character {
  constructor(
    public name: string,
    public portrait: string,
    public color: string,
    public aspects: Set<Aspect>,
    public skills: Map<string, number>
  ) {}
}

