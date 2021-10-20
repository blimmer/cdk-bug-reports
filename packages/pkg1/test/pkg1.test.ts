import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Pkg1 from '../lib/pkg1-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Pkg1.Pkg1Stack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
