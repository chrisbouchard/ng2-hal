export interface NamedAspectTemplate {
  field: string;
  name: string;
}

export interface StressTrackTemplate {
  field: string;
  name: string;
  cap: number;
}

module Template {
  export interface Options {
    id: string;
    namedAspectTemplates: Array<NamedAspectTemplate>;
    stressTracks: Array<StressTrackTemplate>;
  }
}

export class Template implements Template.Options {
  id: string;
  namedAspectTemplates: Array<NamedAspectTemplate>;
  stressTracks: Array<StressTrackTemplate>;

  constructor(options: Template.Options) {
    Object.assign(this, options);
  }
}

