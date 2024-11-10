import * as React from "react";
import { LeaderboardMember } from "../../shared/types/AdventOfCodeLeaderboard";
import { Star } from "@mui/icons-material";
import { amber, grey } from "@mui/material/colors";

type StarsTodayProps = {
  members: LeaderboardMember[];
};

type RecentStar = {
  name: string;
  day: string;
  stars: number;
  lastStarTs: string;
};

const getRecentStarsFromMembers = (
  members: LeaderboardMember[],
): RecentStar[] => {
  return members
    .reduce((accumulator, member) => {
      for (const [day, completion] of Object.entries(
        member.completion_day_level,
      )) {
        accumulator.push({
          name: member.name,
          day: day,
          stars: Object.keys(completion).length,
          lastStarTs: Object.values(completion).reduce((max, completion) => {
            if (completion.get_star_ts > max) {
              return completion.get_star_ts;
            }

            return max;
          }, "0"),
        });
      }

      return accumulator;
    }, [] as RecentStar[])
    .sort((a, b) => Number(b.lastStarTs) - Number(a.lastStarTs))
    .slice(0, 5);
};

const getStarForCount = (count: number, day: string) => {
  return (
    <span
      style={{
        fontSize: "small",
        backgroundColor: count > 1 ? amber[900] : grey[800],
        borderRadius: 5,
        color: count > 1 ? amber[100] : grey[300],
        marginRight: 5,
        display: "inline-block",
        verticalAlign: "middle",
      }}
    >
      <Star
        fontSize="small"
        style={{
          verticalAlign: "middle",
        }}
        sx={{ color: count > 1 ? amber[500] : grey[500] }}
      />
      <span
        style={{
          verticalAlign: "middle",
          paddingRight: 5,
        }}
      >
        {day}
      </span>
    </span>
  );
};

const StarsToday: React.FC<StarsTodayProps> = ({ members }) => {
  const starsToday = getRecentStarsFromMembers(members);

  if (!starsToday.length) {
    return "None, yet...";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: 2,
      }}
    >
      {starsToday.map((member, i) => (
        <span
          key={i}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {getStarForCount(member.stars, member.day)}
          <span
            style={{
              verticalAlign: "middle",
            }}
          >
            {member.name}
          </span>
        </span>
      ))}
    </div>
  );
};

export default StarsToday;
