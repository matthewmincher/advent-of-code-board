import * as React from "react";
import { LeaderboardMember } from "../../shared/types/AdventOfCodeLeaderboard";
import { Star } from "@mui/icons-material";
import { amber, grey } from "@mui/material/colors";

type LatestStarProps = {
  member: LeaderboardMember | undefined;
};

const LatestStar: React.FC<LatestStarProps> = ({ member }) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Star
        fontSize="large"
        style={{
          marginRight: 5,
        }}
        sx={{
          color: grey[100],
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontStyle: "italic",
            fontSize: "80%",
          }}
        >
          Latest star:
        </span>
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {member?.name ?? "No-one... yet!"}
        </span>
      </div>
    </div>
  );
};

export default LatestStar;
