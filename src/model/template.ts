export class NamedAspectTemplate {
  constructor(
    public field: string,
    public name: string
  ) {}
}

export class StressTrackTemplate {
  constructor(
    public field: string,
    public name: string,
    public cap: number
  ) {}
}

export class CharacterTemplate {
  constructor(
    public id: string,
    public namedAspectTemplates: Array<NamedAspectTemplate>,
    public stressTracks: Array<StressTrackTemplate>
  ) {}
}


