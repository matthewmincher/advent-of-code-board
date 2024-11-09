import { format } from "date-fns";
import * as React from "react";
import { Leaderboard } from "../../shared/types/AdventOfCodeLeaderboard";

type LeaderboardProps = {
  leaderboardState: Leaderboard;
};

const Leaderboard: React.FC<LeaderboardProps> = (props) => {
  return <h1>{format(new Date(), "PPpp")}</h1>;
};

export default Leaderboard;
