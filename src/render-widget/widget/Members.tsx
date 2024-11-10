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
      <span style={{ fontFamily: "monospace", whiteSpace: "pre" }}>
        {padStart(`#${i}`, 3, " ")}
      </span>
      <span style={{ whiteSpace: "pre" }}> - </span>
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
