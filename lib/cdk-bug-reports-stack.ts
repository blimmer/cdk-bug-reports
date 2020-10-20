import * as cdk from '@aws-cdk/core';
import * as kinesis from "@aws-cdk/aws-kinesis";
import * as targets from "@aws-cdk/aws-events-targets";
import * as events from '@aws-cdk/aws-events';

export class CdkBugReportsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stream = new kinesis.Stream(this, "Stream", {
      encryption: kinesis.StreamEncryption.KMS,
    });
    const target = new targets.KinesisStream(stream);

    new events.Rule(this, "Rule", {
      eventPattern: {
        account: ['123456789'],
      },
      targets: [target],
    });
  }
}
