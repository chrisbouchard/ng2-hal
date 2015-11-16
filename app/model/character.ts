export interface Aspect {
  label?: string;
  name: string;
}

export interface Character {
  name: string;
  portrait?: string;
  aspects: Aspect[];
  skills: { [index: string]: number }
}

