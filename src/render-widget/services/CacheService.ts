import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";

export default class CacheService {
  private readonly client: CloudFrontClient;
  private readonly distributionId: string;

  constructor(distributionId: string) {
    this.client = new CloudFrontClient();
    this.distributionId = distributionId;
  }

  public async invalidate(path: string) {
    const createInvalidationCommand = new CreateInvalidationCommand({
      DistributionId: this.distributionId,
      InvalidationBatch: {
        Paths: {
          Quantity: 1,
          Items: [path],
        },
        CallerReference: `${new Date()}`,
      },
    });

    return await this.client.send(createInvalidationCommand);
  }
}
