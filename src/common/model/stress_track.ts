export interface StressBox {
  enabled: boolean;
  marked: boolean;
}

export type StressTrack = StressBox[];

export const COMMON_STRESS_TRACKS = {
  PHYSICAL: 'physical',
  MENTAL: 'mental'
};

