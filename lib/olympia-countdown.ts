// Olympia Activation Block — Update this ONE value when CDC-23 sets the block.
// All countdown components read from here.
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
