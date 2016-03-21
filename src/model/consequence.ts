import {Aspect} from './aspect';

export interface Consequence {
  type?: string;
  aspect?: Aspect;
}

export const COMMON_CONSEQUENCES = {
  MILD: 'mild',
  MODERATE: 'moderate',
  SEVERE: 'severe',
  EXTREME: 'extreme'
};

