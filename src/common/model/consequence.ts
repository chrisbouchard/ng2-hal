import {Aspect} from './aspect';

export interface Consequence {
  type?: string;
  aspect?: Aspect;
}

export const COMMON_CONSEQUENCES = {
  MILD: 'mild',
  MODERAGE: 'moderate',
  SEVERE: 'severe',
  EXTREME: 'extreme'
};

