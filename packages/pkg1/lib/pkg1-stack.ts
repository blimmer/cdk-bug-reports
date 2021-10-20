import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda-nodejs'

export class Pkg1Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new lambda.NodejsFunction(this, 'Lambda', {
      bundling: {
        nodeModules: ['axios']
      }
    })
  }
}
