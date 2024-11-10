import { Leaderboard } from "../../shared/types/AdventOfCodeLeaderboard";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import LeaderboardElement from "../widget/Leaderboard";
import styled from "@emotion/styled";

export const ssr = (leaderboard: Leaderboard): string => {
  const Div = styled.div``;

  return ReactDOMServer.renderToStaticMarkup(
    <Div
      style={{
        backgroundColor: "black",
        color: "white",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 50 50' style='enable-background:new 0 0 50 50%3B' xml:space='preserve'%3E%3Cstyle type='text/css'%3E.st1%7Bopacity:0.7%3Bfill:%23FFFFFF%3B%7D.st3%7Bopacity:0.1%3Bfill:%23FFFFFF%3B%7D%3C/style%3E%3Ccircle class='st3' cx='4' cy='14' r='1'/%3E%3Ccircle class='st3' cx='43' cy='3' r='1'/%3E%3Ccircle class='st3' cx='31' cy='30' r='2'/%3E%3Ccircle class='st3' cx='19' cy='23' r='1'/%3E%3Ccircle class='st3' cx='37' cy='22' r='1'/%3E%3Ccircle class='st3' cx='43' cy='16' r='1'/%3E%3Ccircle class='st3' cx='8' cy='45' r='1'/%3E%3Ccircle class='st3' cx='29' cy='39' r='1'/%3E%3Ccircle class='st3' cx='13' cy='37' r='1'/%3E%3Ccircle class='st3' cx='47' cy='32' r='1'/%3E%3Ccircle class='st3' cx='15' cy='4' r='2'/%3E%3Ccircle class='st3' cx='9' cy='27' r='1'/%3E%3Ccircle class='st3' cx='30' cy='9' r='1'/%3E%3Ccircle class='st3' cx='25' cy='15' r='1'/%3E%3Ccircle class='st3' cx='21' cy='45' r='2'/%3E%3Ccircle class='st3' cx='42' cy='45' r='1'/%3E%3C/svg%3E\")",
        backgroundPosition: "0px 0px",
        backgroundSize: "150px",
        width: "579px",
        height: "178px",
        overflow: "hidden",
        padding: 10,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <h2
        style={{
          fontSize: 32,
          textAlign: "center",
          paddingTop: 0,
          marginTop: 0,
          marginBottom: 10,
          minHeight: 30,
        }}
      >
        Advent of Code
      </h2>
      <LeaderboardElement state={leaderboard} />
    </Div>,
  );
};
