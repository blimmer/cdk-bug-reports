import { CfnOutput, Construct, Stack, StackProps } from "@aws-cdk/core";

export class ComputeStack extends Stack {
  readonly myOutput: CfnOutput

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.myOutput = new CfnOutput(this, 'Output', { value: 'example' })
  }
}
