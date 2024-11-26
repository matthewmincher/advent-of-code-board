import * as http from "http";
import { ssr } from "./components/ServerClient";
import * as leaderboard from "../../test/fixtures/leaderboard.json";
import { Leaderboard } from "../shared/types/AdventOfCodeLeaderboard";

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(ssr(leaderboard as unknown as Leaderboard));
  })
  .listen(3000);
