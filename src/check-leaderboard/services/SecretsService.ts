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
  private readonly secretName: string;

  constructor(secretName: string) {
    this.client = new SecretsManagerClient();
  }

  public async getSessionId(): Promise<string> {
    const getSecretsCommand = new GetSecretValueCommand({
      SecretId: this.secretName,
    });
    const secretValue = await this.client.send(getSecretsCommand);

    if (!secretValue.SecretString) {
      throw new Error(`Missing secret value for ${this.secretName}`);
    }

    const secrets = JSON.parse(secretValue.SecretString);

    if (typeof secrets.SESSION_ID !== "string") {
      throw new Error(`Missing session ID in secrets`);
    }

    return secrets.SESSION_ID;
  }
}
