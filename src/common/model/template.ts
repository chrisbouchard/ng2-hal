export interface StressTrackSlot {
  field: string;
  cap: number;
}

module Template {
  export interface Options {
    id: string;
    name: string;

    aspectNames: Map<string, string>;
    consequenceNames: Map<string, string>;
    stressTrackNames: Map<string, string>;

    aspectSlots: Array<string>;
    consequenceSlots: Array<string>;
    stressTrackSlots: Array<StressTrackSlot>;
  }
}

export class Template implements Template.Options {
  id: string;
  name: string;

  aspectNames: Map<string, string>;
  consequenceNames: Map<string, string>;
  stressTrackNames: Map<string, string>;

  aspectSlots: Array<string>;
  consequenceSlots: Array<string>;
  stressTrackSlots: Array<StressTrackSlot>;

  constructor(options: Template.Options) {
    Object.assign(this, options);
  }
}

