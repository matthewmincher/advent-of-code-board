import * as fs from "node:fs";
import { Leaderboard } from "../../shared/types/AdventOfCodeLeaderboard";
import { format } from "date-fns";

export default class WidgetService {
  constructor() {}

  public renderWidgetFromLeaderboard(leaderboard: Leaderboard): string {
    return `<h1>${format(new Date(), "PPpp")}</h1>`;
  }
}
