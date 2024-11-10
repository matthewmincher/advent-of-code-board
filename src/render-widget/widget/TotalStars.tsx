import * as React from "react";
import { LeaderboardMember } from "../../shared/types/AdventOfCodeLeaderboard";
import { Star } from "@mui/icons-material";
import { amber, red } from "@mui/material/colors";

type TotalStarsProps = {
  count: number;
};

const TotalStars: React.FC<TotalStarsProps> = ({ count }) => {
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
          color: red[800],
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            fontStyle: "italic",
            fontSize: "80%",
          }}
        >
          Total stars:
        </span>
        <span>{count}</span>
      </div>
    </div>
  );
};

export default TotalStars;
