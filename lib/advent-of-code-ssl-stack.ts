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

interface AdventOfCodeSslStackProps extends cdk.StackProps {
  domainName: string;
}

export class AdventOfCodeSslStack extends cdk.Stack {
  public readonly webCertificate: cm.Certificate;

  constructor(scope: Construct, id: string, props: AdventOfCodeSslStackProps) {
    super(scope, id, props);

    this.webCertificate = new cm.Certificate(
      this,
      "WebDistributionSslCertificate",
      {
        domainName: props.domainName,
        validation: cm.CertificateValidation.fromDns(),
      },
    );
  }
}
