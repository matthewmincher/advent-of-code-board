import AdventOfCodeLeaderboardService from "./services/AdventOfCodeLeaderboardService";
import StorageService from "./services/StorageService";
import WidgetService from "./services/WidgetService";
import { Handler } from "aws-lambda";
import * as path from "node:path";
import SecretsService from "./services/SecretsService";

const leaderboardService = new AdventOfCodeLeaderboardService();
const storageService = new StorageService();
const widgetService = new WidgetService(
  path.join(__dirname, "assets", "widget.html"),
);
const secretsService = new SecretsService(process.env.SECRET_ARN);

export const handler: Handler = async (event, context) => {
  const eventYear = process.env.AOC_EVENT_YEAR;
  const leaderboardId = process.env.AOC_LEADERBOARD_ID;

  console.log(`Invoked for ${eventYear}/${leaderboardId}`);

  const secretToken = await secretsService.getSessionId();

  const leaderboard = await leaderboardService.getLeaderboard(
    secretToken,
    eventYear,
    leaderboardId,
  );

  console.log(`Retrieved leaderboard from API`);

  await storageService.storeLeaderboard(leaderboard);
  await storageService.storeWebIndex(
    widgetService.renderWidgetFromLeaderboard(leaderboard),
  );
};
