#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkBugReportsStack } from '../lib/cdk-bug-reports-stack';

const app = new cdk.App();
new CdkBugReportsStack(app, 'CdkBugReportsStack');
