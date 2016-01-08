export class NamedAspectTemplate {
  constructor(
    public field: string,
    public name: string
  ) {}
}

export class CharacterTemplate {
  constructor(
    public id: string,
    public namedAspectTemplates: Array<NamedAspectTemplate>
  ) {}
}


