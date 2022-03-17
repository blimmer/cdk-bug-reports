import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cdk from "aws-cdk-lib";
import { join } from "path";
import { Construct } from "constructs";

export class CdkBugReportsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, {
      env: {
        region: 'us-west-2',
      },
      ...props
    });

    const bucket = new s3.Bucket(this, "HostingBucket");
    const rootRedirectEdgeFunction = new cloudfront.experimental.EdgeFunction(this, "RootRedirectEdgeFunction", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "root-redirect.handler",
      code: lambda.Code.fromAsset(join(__dirname, "lambda-at-edge")),
    });

    new cloudfront.Distribution(this, "SiteDistribution", {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
        edgeLambdas: [
          {
            eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
            functionVersion: rootRedirectEdgeFunction.currentVersion,
          },
        ],
      },
    });
  }
}
