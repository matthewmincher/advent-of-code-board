import { Leaderboard } from "../types/AdventOfCodeLeaderboard";
import * as fs from "node:fs";

export default class WidgetService {
  private readonly widgetTemplate: string;

  constructor(templatePath: string) {
    this.widgetTemplate = fs.readFileSync(templatePath, "utf8");
  }

  public renderWidgetFromLeaderboard(leaderboard: Leaderboard): string {
    let html = this.widgetTemplate;

    return html;
  }
}
