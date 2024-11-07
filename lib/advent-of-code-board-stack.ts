import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as scheduler from "@aws-cdk/aws-scheduler-alpha";
import * as scheduler_targets from "@aws-cdk/aws-scheduler-targets-alpha";
import * as iam from "aws-cdk-lib/aws-iam";
import * as secrets from "aws-cdk-lib/aws-secretsmanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as path from "node:path";
import * as logs from "aws-cdk-lib/aws-logs";
import * as cm from "aws-cdk-lib/aws-certificatemanager";

interface AdventOfCodeBoardStackProps extends cdk.StackProps {
  domainName: string;
  webCertificate: cm.Certificate;
}

export class AdventOfCodeBoardStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: AdventOfCodeBoardStackProps,
  ) {
    super(scope, id, props);

    const dataBucket = this.createBucket("DataBucket");
    const webBucket = this.createBucket("WebBucket");

    const projectRoot = path.resolve(__dirname, "../");
    const lambdaRoot = path.resolve(__dirname, "../src");

    const secret = new secrets.Secret(this, "aoc-secrets", {
      secretName: "aoc/leaderboardchecker",
    });

    const leaderboardCheckRole = new iam.Role(this, "LeaderboardCheckerRole", {
      assumedBy: new iam.ServicePrincipal("scheduler.amazonaws.com"),
    });

    const leaderboardChecker = this.createLeaderboardCheckLambda(
      projectRoot,
      lambdaRoot,
      webBucket,
      dataBucket,
      secret,
    );

    secret.grantRead(leaderboardChecker);
    dataBucket.grantPut(leaderboardChecker);
    webBucket.grantPut(leaderboardChecker);
    leaderboardChecker.grantInvoke(leaderboardCheckRole);

    const schedule = new scheduler.Schedule(
      this,
      "HourlyLeaderboardCheckSchedule",
      {
        scheduleName: "hourly-leaderboard-check",
        description:
          "Runs a lambda function every hour to store a copy of the leaderboard",
        schedule: scheduler.ScheduleExpression.cron({
          minute: "0",
          month: "12",
        }),
        target: new scheduler_targets.LambdaInvoke(leaderboardChecker, {
          retryAttempts: 0,
        }),
        timeWindow: scheduler.TimeWindow.off(),
      },
    );

    this.setupDistribution(webBucket, props.domainName, props.webCertificate);
  }

  private createBucket(id: string): s3.Bucket {
    return new s3.Bucket(this, id, {
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });
  }

  private setupDistribution(
    bucket: s3.Bucket,
    domainName: string,
    certificate: cm.Certificate,
  ) {
    return new cloudfront.Distribution(this, "WebDistribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin:
          cloudfront_origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: [domainName],
      certificate: certificate,
    });
  }

  private createLeaderboardCheckLambda(
    projectRoot: string,
    lambdaRoot: string,
    webBucket: s3.Bucket,
    dataBucket: s3.Bucket,
    secret: secrets.Secret,
  ): nodejs.NodejsFunction {
    const secretsLayerArn =
      "arn:aws:lambda:eu-west-2:133256977650:layer:AWS-Parameters-and-Secrets-Lambda-Extension:11";

    return new nodejs.NodejsFunction(this, "LeaderboardChecker", {
      functionName: "aoc-leaderboard-checker-cron",
      runtime: lambda.Runtime.NODEJS_20_X,
      layers: [
        lambda.LayerVersion.fromLayerVersionArn(
          this,
          "secrets-layer",
          secretsLayerArn,
        ),
      ],
      projectRoot: projectRoot,
      entry: path.join(lambdaRoot, "check-leaderboard", "index.ts"),
      handler: "index.handler",
      depsLockFilePath: path.join(projectRoot, "package-lock.json"),
      environment: {
        AOC_LEADERBOARD_ID: process.env.AOC_LEADERBOARD_ID!,
        AOC_EVENT_YEAR: process.env.AOC_EVENT_YEAR!,
        SECRET_ARN: secret.secretArn,
        S3_REGION: this.region,
        S3_WEB_BUCKET_NAME: webBucket.bucketName,
        S3_DATA_BUCKET_NAME: dataBucket.bucketName,
      },
      retryAttempts: 0,
      timeout: cdk.Duration.seconds(30),
      logRetention: logs.RetentionDays.ONE_WEEK,
      bundling: {
        commandHooks: {
          beforeBundling(inputDir: string, outputDir: string): string[] {
            return [];
          },
          afterBundling(inputDir: string, outputDir: string): string[] {
            return [
              `cp -R ${inputDir}/src/check-leaderboard/assets ${outputDir}/assets`,
            ];
          },
          beforeInstall(inputDir: string, outputDir: string): string[] {
            return [];
          },
        },
      },
    });
  }
}
