import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { join } from 'path'

export class CdkBugReportsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new NodejsFunction(this, 'Lambda', {
      entry: join(__dirname, 'lambda', 'index.ts'),
      depsLockFilePath: join(__dirname, 'lambda', 'package-lock.json')
    })
  }
}
