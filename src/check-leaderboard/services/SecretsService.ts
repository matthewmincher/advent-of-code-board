import { Leaderboard } from "../types/AdventOfCodeLeaderboard";
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { format } from "date-fns";
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

export default class SecretsService {
  private readonly client: SecretsManagerClient;
  private readonly secretArn: string;

  constructor(secretArn: string) {
    this.client = new SecretsManagerClient();
    this.secretArn = secretArn;
  }

  public async getSessionId(): Promise<string> {
    const getSecretsCommand = new GetSecretValueCommand({
      SecretId: this.secretArn,
    });
    const secretValue = await this.client.send(getSecretsCommand);

    if (!secretValue.SecretString) {
      throw new Error(`Missing secret value for ${this.secretArn}`);
    }

    const secrets = JSON.parse(secretValue.SecretString);

    if (typeof secrets.SESSION_ID !== "string") {
      throw new Error(`Missing session ID in secrets`);
    }

    return secrets.SESSION_ID;
  }
}
