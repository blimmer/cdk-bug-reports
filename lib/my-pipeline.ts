import { MyApplication } from "./my-application";
import * as pipelines from '@aws-cdk/pipelines'
import { Stack, Construct, StackProps } from "@aws-cdk/core";
import { ShellStep } from "@aws-cdk/pipelines";

export class MyPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      synth: new pipelines.ShellStep('Synth', {
        // Use a connection created using the AWS console to authenticate to GitHub
        // Other sources are available.
        input: pipelines.CodePipelineSource.connection('my-org/my-app', 'main', {
          connectionArn: 'arn:aws:codestar-connections:us-east-1:222222222222:connection/7d2469ff-514a-4e4f-9003-5ca4a43cdc41', // Created using the AWS console * });',
        }),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });

    const stage = new MyApplication(this, 'Prod', {
      env: {
        account: '123456789012',
        region: 'eu-west-1',
      },
    });
    pipeline.addStage(stage, {
      post: [new ShellStep('ShellStep', {
        envFromCfnOutputs: {
          OUTPUT: stage.computeStack.myOutput
        },
        commands: [
          'echo $OUTPUT'
        ]
      })]
    });
  }
}
