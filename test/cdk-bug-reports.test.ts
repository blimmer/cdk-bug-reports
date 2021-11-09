import { Template } from '@aws-cdk/assertions';
import * as cdk from '@aws-cdk/core';
import * as CdkBugReports from '../lib/cdk-bug-reports-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CdkBugReports.CdkBugReportsStack(app, 'MyTestStack');
    // THEN
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toEqual({})
});
