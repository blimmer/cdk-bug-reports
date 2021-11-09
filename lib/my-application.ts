import { Stage, Construct, StageProps } from "@aws-cdk/core";
import { ComputeStack } from "./compute";

export class MyApplication extends Stage {
  readonly computeStack: ComputeStack;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    this.computeStack = new ComputeStack(this, 'AVeryVeryLongIdThatProbablyHasSomePurposeBeingSoLongButDoesSeemALittleBitEgregiousJustSayin')
  }
}
