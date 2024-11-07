import { Leaderboard } from "../types/AdventOfCodeLeaderboard";
import * as fs from "node:fs";
import path = require("node:path");

export default class WidgetService {
  private readonly widgetTemplate: string;

  constructor() {
    this.widgetTemplate = fs.readFileSync(
      path.join(__dirname, "..", "assets", "widget.html"),
      "utf8",
    );
  }

  public renderWidgetFromLeaderboard(leaderboard: Leaderboard): string {
    let html = this.widgetTemplate;

    return html;
  }
}
