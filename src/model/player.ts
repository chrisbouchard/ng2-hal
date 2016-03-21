module Player {
  export interface Options {
    id: string;
    name: string;
  }
}

export class Player {
  id: string;
  name: string;

  constructor(options: Player.Options) {
    Object.assign(this, options);
  }
}

