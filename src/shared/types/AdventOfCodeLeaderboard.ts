type Id = string;
type Timestamp = string;

type CompletionDay = Map<Id, CompletionDayItem>;

type CompletionDayItem = {
  star_index: number;
  get_star_timestamp: Timestamp;
};

type LeaderboardMember = {
  id: Id;
  name: string;
  stars: number;
  last_star_ts: Timestamp;
  global_score: number;
  local_score: number;
  completion_day_level: CompletionDay;
};

export type Leaderboard = {
  event: string;
  owner_id: Id;
  members: Map<Id, LeaderboardMember>;
};
