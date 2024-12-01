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
  ts: string;
};

const getRecentStarsFromMembers = (
  members: LeaderboardMember[],
): RecentStar[] => {
  return members
    .reduce((accumulator, member) => {
      for (const [day, completion] of Object.entries(
        member.completion_day_level,
      )) {
        for(const star in completion) {
          const award = completion[star];

          accumulator.push({
            name: member.name,
            day: day,
            stars: Number(star),
            ts: award.get_star_ts,
          });
        }
      }

      return accumulator;
    }, [] as RecentStar[])
    .sort((a, b) => Number(b.ts) - Number(a.ts))
    .slice(0, 20);
};

const getStarForCount = (count: number, day: string) => {
  return (
    <span
      style={{
        backgroundColor: count > 1 ? amber[900] : grey[800],
        borderRadius: 5,
        color: count > 1 ? amber[100] : grey[300],
        marginRight: 5,
        display: "inline-block",
      }}
    >
      <Star
        fontSize="inherit"
        sx={{ color: count > 1 ? amber[500] : grey[500] }}
      />
      <span
        style={{
          paddingRight: 5,
        }}
      >
        {day}.{count}
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
            fontSize: "15px"
          }}
        >
          {getStarForCount(member.stars, member.day)}
          <span
            style={{}}
          >
            {member.name}
          </span>
        </span>
      ))}
    </div>
  );
};

export default StarsToday;
