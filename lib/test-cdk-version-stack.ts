import * as cdk from 'aws-cdk-lib';
import { DockerImageName, ECRDeployment } from 'cdk-ecr-deployment';
import { Construct } from 'constructs';

export class TestCdkVersionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new ECRDeployment(this, 'DeployDockerImage2', {
      src: new DockerImageName('nginx:latest'),
      dest: new DockerImageName(`12312321893.dkr.ecr.us-west-2.amazonaws.com/my-nginx2:latest`),
    });
  }
}
