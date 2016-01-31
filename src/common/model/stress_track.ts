export interface StressBox {
  enabled: boolean,
  marked: boolean
}

export type StressTrack = Array<StressBox>;

export const COMMON_STRESS_TRACKS = {
  PHYSICAL: 'physical',
  MENTAL: 'mental'
}

