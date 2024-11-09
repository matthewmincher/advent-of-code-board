import { Leaderboard } from "../../shared/types/AdventOfCodeLeaderboard";
import { ssr } from "../widget/ServerClient";

export default class WidgetService {
  constructor() {}

  public renderWidgetFromLeaderboard(leaderboard: Leaderboard): string {
    return ssr(leaderboard);
  }
}
