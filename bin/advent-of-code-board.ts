#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AdventOfCodeBoardStack } from "../lib/advent-of-code-board-stack";
import { AdventOfCodeSslStack } from "../lib/advent-of-code-ssl-stack";

if (!process.env.AOC_LEADERBOARD_ID) {
  throw new Error("AOC_LEADERBOARD_ID is a required environment variable");
}

if (!process.env.AOC_EVENT_YEAR) {
  throw new Error("AOC_EVENT_YEAR is a required environment variable");
}

if (!process.env.DOMAIN) {
  throw new Error("DOMAIN is a required environment variable");
}

const domainName = process.env.DOMAIN;

const app = new cdk.App();

const sslStack = new AdventOfCodeSslStack(app, "AdventOfCodeSslStack", {
  env: {
    region: "us-east-1",
  },
  domainName,
  crossRegionReferences: true,
});

const boardStack = new AdventOfCodeBoardStack(app, "AdventOfCodeBoardStack", {
  env: {
    region: "eu-west-2",
  },
  domainName,
  webCertificate: sslStack.webCertificate,
  crossRegionReferences: true,
});
