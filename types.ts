export interface Capsule {
  id: string;
  message: string;
  color: string;
}

export enum AppStep {
  INTRO = 0,
  MESSAGE = 1,
  GACHA = 2,
  OUTRO = 3
}