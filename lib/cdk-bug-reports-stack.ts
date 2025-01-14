import * as cdk from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path';
import { Runtime } from 'aws-cdk-lib/aws-lambda';

export class CdkBugReportsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new NodejsFunction(this, 'Function', {
      entry: path.join(__dirname, 'lambda.ts'),
      runtime: Runtime.NODEJS_20_X,
      bundling: {
        minify: true,
        // Will be installed, not bundled
        // (axios is a package with sub-dependencies,
        // will be used to ensure bun bundling works as expected)
        nodeModules: ['axios'],
        forceDockerBundling: true,
      },
    });
  }
}
