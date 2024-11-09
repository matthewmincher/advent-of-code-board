import AdventOfCodeLeaderboardService from "./services/AdventOfCodeLeaderboardService";

import { Handler } from "aws-lambda";
import SecretsService from "./services/SecretsService";
import StorageService from "../shared/services/StorageService";

const leaderboardService = new AdventOfCodeLeaderboardService();
const storageService = new StorageService();
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
};
