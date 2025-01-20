import * as cdk from 'aws-cdk-lib';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
import { Construct } from 'constructs';
import { join } from 'path';

export class CdkBugReportsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repo = new Repository(this, "Repository" );

    new DockerImageAsset(this, 'DockerImageAsset', {
      directory: join(__dirname, '..', 'assets', 'docker'),
      buildArgs: {
        "AWS_ACCOUNT_NUMBER": this.account,
        "AWS_REGION": this.region,
        "REPO": repo.repositoryName,
        "TAG": "latest" // TODO: push some image with `latest` tag
      }
    })
  }
}
