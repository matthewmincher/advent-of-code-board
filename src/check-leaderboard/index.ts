import AdventOfCodeLeaderboardService from "./services/AdventOfCodeLeaderboardService";
import StorageService from "./services/StorageService";
import WidgetService from "./services/WidgetService";
import { Handler } from "aws-lambda";

const leaderboardService = new AdventOfCodeLeaderboardService();
const storageService = new StorageService();
const widgetService = new WidgetService();

export const handler: Handler = async (event, context) => {
  const eventYear = process.env.AOC_EVENT_YEAR;
  const leaderboardId = process.env.AOC_LEADERBOARD_ID;

  console.log(`Invoked for ${eventYear}/${leaderboardId}`);

  const leaderboard = await leaderboardService.getLeaderboard(
    eventYear,
    leaderboardId,
  );

  console.log(`Retrieved leaderboard from API`);

  await storageService.storeLeaderboard(leaderboard);
  await storageService.storeWebIndex(
    widgetService.renderWidgetFromLeaderboard(leaderboard),
  );
};
