import * as React from "react";
import { People } from "@mui/icons-material";
import { green } from "@mui/material/colors";

type ParticipantCountProps = {
  count: number;
};

const ParticipantCount: React.FC<ParticipantCountProps> = ({ count }) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <People
        fontSize="large"
        style={{
          marginRight: 5,
        }}
        sx={{
          color: green[500],
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
          Team:
        </span>
        <span>{count > 0 ? `${count}` : "No-one :("}</span>
      </div>
    </div>
  );
};

export default ParticipantCount;
