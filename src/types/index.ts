export const SNOWBOARD_STATUSES = [
  '新品',
  'ベースWAX済',
  '滑走WAX済',
  '滑走準備OK',
  '滑走後',
  'クリーニング済',
] as const;

export type SnowboardStatus = typeof SNOWBOARD_STATUSES[number];

export type Snowboard = {
  id: string;
  brand: string;
  modelName: string;
  status: SnowboardStatus;
};