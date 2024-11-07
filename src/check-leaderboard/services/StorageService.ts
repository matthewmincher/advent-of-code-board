import { Leaderboard } from "../types/AdventOfCodeLeaderboard";
import {
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
    const fileKey = `${leaderboard.event}_${leaderboard.owner_id}_${format(new Date(), "d-h-m")}`;

    const params: PutObjectCommandInput = {
      Body: JSON.stringify(leaderboard),
      Bucket: process.env.S3_DATA_BUCKET_NAME,
      Key: `leaderboard_${fileKey}.json`,
    };

    console.log(`Putting leaderboard entry to ${fileKey}`);

    const command = new PutObjectCommand(params);
    await this.client.send(command);
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
