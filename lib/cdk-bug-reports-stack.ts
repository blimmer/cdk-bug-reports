import { DockerImage, Stack, StackProps } from 'aws-cdk-lib';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { Construct } from 'constructs';

export class CdkBugReportsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new Asset(this, 'Asset', {
      path: __dirname,
      bundling: {
        image: DockerImage.fromRegistry('ubuntu:latest'),
        command: [
          "/bin/bash", "-c", [
            "echo 'Hello, world!'",
            "./not-a-real-script", // force a failure - this file doesn't exist
          ].join(' && ')
        ]
      }
    })
  }
}
