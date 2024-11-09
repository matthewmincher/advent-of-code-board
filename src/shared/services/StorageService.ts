import { Leaderboard } from "../types/AdventOfCodeLeaderboard";
import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { format } from "date-fns";

export default class StorageService {
  private readonly client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.S3_REGION,
    });
  }

  public async storeLeaderboard(leaderboard: Leaderboard) {
    const data = JSON.stringify(leaderboard);

    const resultsKey = `${leaderboard.event}_${leaderboard.owner_id}_${format(new Date(), "d-h-m")}`;

    await Promise.allSettled(
      [`leaderboard_${resultsKey}.json`, `latest.json`].map((fileKey) => {
        const params: PutObjectCommandInput = {
          Body: data,
          Bucket: process.env.S3_DATA_BUCKET_NAME,
          Key: fileKey,
        };

        console.log(`Putting leaderboard entry to ${fileKey}`);
        const command = new PutObjectCommand(params);

        return this.client.send(command);
      }),
    );
  }

  public async getLatestLeaderboard() {
    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.S3_DATA_BUCKET_NAME,
      Key: `latest.json`,
    });

    const latestFile = await this.client.send(getObjectCommand);

    if (!latestFile.Body) {
      throw new Error("No contents found for latest leaderboard");
    }

    const jsonString = await latestFile.Body.transformToString();

    return JSON.parse(jsonString) as Leaderboard;
  }

  public async storeWebIndex(html: string) {
    const params: PutObjectCommandInput = {
      Body: html,
      Bucket: process.env.S3_WEB_BUCKET_NAME,
      Key: `index.html`,
      ContentType: "text/html",
    };

    console.log(`Putting rendered widget to index.html`);

    const command = new PutObjectCommand(params);
    await this.client.send(command);
  }
}
