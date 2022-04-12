import { Stack, StackProps } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { AuroraPostgresEngineVersion, DatabaseCluster, DatabaseClusterEngine, DatabaseClusterFromSnapshot } from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';

export class CdkBugReportsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'VPC')
    new DatabaseCluster(this, 'DatabaseCluster', {
      engine: DatabaseClusterEngine.auroraPostgres({ version: AuroraPostgresEngineVersion.VER_13_4 }),
      instanceProps: {
        vpc
      }
    })

    new DatabaseClusterFromSnapshot(this, 'DatabaseClusterFromSnapshot', {
      snapshotIdentifier: 'arn:aws:rds:us-east-1:12345678910:cluster-snapshot:rds:example-2022-04-12-09-26',
      engine: DatabaseClusterEngine.auroraPostgres({ version: AuroraPostgresEngineVersion.VER_13_4 }),      instanceProps: {
        vpc
      }
    })
  }
}
