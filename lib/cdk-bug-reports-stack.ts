import { Stack, StackProps } from 'aws-cdk-lib';
import { ResponseHeadersPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkBugReportsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new ResponseHeadersPolicy(this, 'ResponseHeadersPolicy')
  }
}
