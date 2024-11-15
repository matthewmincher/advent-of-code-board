import * as React from "react";
import {
  Leaderboard,
  LeaderboardMember,
} from "../../shared/types/AdventOfCodeLeaderboard";
import { Star } from "@mui/icons-material";
import LatestStar from "./LatestStar";
import TotalStars from "./TotalStars";
import ParticipantCount from "./ParticipantCount";
import Members from "./Members";
import StarsToday from "./StarsToday";

type LeaderboardProps = {
  state: Leaderboard;
};

const getTotalStars = (leaderboard: Leaderboard) => {
  return Object.values(leaderboard.members).reduce((aggregate, member) => {
    return aggregate + member.stars;
  }, 0);
};

const getLatestStar = (leaderboard: Leaderboard) => {
  return Object.values(leaderboard.members).reduce(
    (aggregate, member) => {
      if (member.last_star_ts > (aggregate?.last_star_ts ?? 0)) {
        return member;
      }

      return aggregate;
    },
    undefined as LeaderboardMember | undefined,
  );
};

const Leaderboard: React.FC<LeaderboardProps> = ({ state }) => {
  const totalStars = getTotalStars(state);
  const latestStar = getLatestStar(state);
  const participantCount = Object.keys(state.members).length;
  const members = Object.values(state.members).sort((a, b) => {
    if (b.stars == a.stars) {
      return Number(b.id) - Number(a.id);
    }

    return b.stars - a.stars;
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          overflow: "hidden",
          minHeight: 0,
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "start",
            minWidth: 150,
            maxWidth: 185,
            overflow: "hidden",
          }}
        >
          <ParticipantCount count={participantCount} />
          <TotalStars count={totalStars} />
          <LatestStar member={latestStar} />
        </div>
        <div
          style={{
            maskImage: "linear-gradient(180deg, #000 70%, transparent)",
            overflowY: "scroll",
            scrollbarWidth: "none",
            paddingBottom: 15,
            minWidth: 190,
            maxWidth: 220
          }}
        >
          <div
            style={{
              fontStyle: "italic",
              fontSize: "80%",
            }}
          >
            Recent:
          </div>
          <StarsToday members={Object.values(state.members)} />
        </div>
        <div
          style={{
            maskImage: "linear-gradient(180deg, #000 70%, transparent)",
            overflowY: "scroll",
            scrollbarWidth: "none",
            paddingBottom: 15,
            width: 220,
            flexGrow: 1,
            maxWidth: 270
          }}
        >
          <div
            style={{
              fontStyle: "italic",
              fontSize: "80%",
            }}
          >
            Overall Standings:
          </div>
          <Members members={members} />
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
