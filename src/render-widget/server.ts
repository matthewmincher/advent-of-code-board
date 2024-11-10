import * as http from "http";
import * as fs from "node:fs";
import { ssr } from "./components/ServerClient";
import * as leaderboard from "../../test/fixtures/leaderboard.json";
import { Leaderboard } from "../shared/types/AdventOfCodeLeaderboard";

http
  .createServer((req, res) => {
    if (req.url?.endsWith("/style.css")) {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(fs.readFileSync("./widget/style.css"), "utf8");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });

    res.end(ssr(leaderboard as unknown as Leaderboard));
  })
  .listen(3000);
