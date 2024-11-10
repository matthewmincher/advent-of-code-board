type Id = string;
type Timestamp = string;

type CompletionDayItem = {
  star_index: number;
  get_star_ts: Timestamp;
};

export type LeaderboardMember = {
  id: Id;
  name: string;
  stars: number;
  last_star_ts: Timestamp;
  global_score: number;
  local_score: number;
  completion_day_level: { [key: Id]: { [key: Id]: CompletionDayItem } };
};

export type Leaderboard = {
  event: string;
  owner_id: Id;
  members: { [key: Id]: LeaderboardMember };
};
