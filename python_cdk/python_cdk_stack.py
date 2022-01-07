from aws_cdk import core as cdk
from aws_cdk import core as cdk, aws_ec2 as ec2, aws_rds as rds


class PythonCdkStack(cdk.Stack):
    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        cluster = rds.DatabaseCluster(
            self,
            "Database",
            engine=rds.DatabaseClusterEngine.aurora_mysql(
                version=rds.AuroraMysqlEngineVersion.VER_2_08_1
            ),
            credentials=rds.Credentials.from_generated_secret("clusteradmin"),
            # Optional - will default to 'admin' username and generated password
            instance_props=rds.InstanceProps(
                # optional , defaults to t3.medium
                instance_type=ec2.InstanceType.of(
                    ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.SMALL
                ),
                vpc_subnets=ec2.SubnetSelection(subnet_type=ec2.SubnetType.PRIVATE),
                vpc=vpc,
            ),
        )
