import { Handler } from "aws-lambda";
import StorageService from "../shared/services/StorageService";
import WidgetService from "./services/WidgetService";
import CacheService from "./services/CacheService";

const storageService = new StorageService();
const widgetService = new WidgetService();
const cacheService = new CacheService(process.env.CLOUDFRONT_DISTRIBUTION_ID);

export const handler: Handler = async (event, context) => {
  const latestLeaderboard = await storageService.getLatestLeaderboard();
  const widget = widgetService.renderWidgetFromLeaderboard(latestLeaderboard);

  await storageService.storeWebIndex(widget);
  await cacheService.invalidate("index.html");
};
