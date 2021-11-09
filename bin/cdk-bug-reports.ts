#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MyPipelineStack } from '../lib/my-pipeline';

const app = new cdk.App();
new MyPipelineStack(app, 'PipelineStack', {
  env: {
    account: '123456789012',
    region: 'eu-west-1',
  }
});
