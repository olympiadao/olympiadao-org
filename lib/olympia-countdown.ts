// Set once the Olympia activation block is announced.
export const OLYMPIA_ACTIVATION_BLOCK: number | null = null;

export const AVG_BLOCK_TIME_SECONDS = 13;

export type CountdownStatus = "tbd" | "pending" | "activated";

export interface CountdownState {
  status: CountdownStatus;
  block: number | null;
  blocksRemaining: number | null;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null;
}
