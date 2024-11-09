import { Leaderboard } from "../../shared/types/AdventOfCodeLeaderboard";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import LeaderboardElement from "./Leaderboard";

export const ssr = (leaderboard: Leaderboard): string => {
  return ReactDOMServer.renderToStaticMarkup(
    <LeaderboardElement leaderboardState={leaderboard} />,
  );
};
