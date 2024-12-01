import * as React from "react";
import { LeaderboardMember } from "../../shared/types/AdventOfCodeLeaderboard";
import { Star } from "@mui/icons-material";
import { padEnd, padStart } from "lodash";

type MembersProps = {
  members: LeaderboardMember[];
};

const Members: React.FC<MembersProps> = ({ members }) => {
  return members.map((member, i) => (
    <div
      style={{
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Star fontSize="small" />
      <span
        style={{
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {member.stars} - {member.name}
      </span>
    </div>
  ));
};

export default Members;
