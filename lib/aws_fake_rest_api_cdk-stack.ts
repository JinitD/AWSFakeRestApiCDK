import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { environment } from '../env/env.config';
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import path = require('path');
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsFakeRestApiCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const BASE_URL = environment.api;


    const lambdaRole = new iam.Role(this, `MyRole`, {
      roleName: `${this.stackName}-role-stack`,
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });

    const LAMBDA_CONFIGURATION: NodejsFunctionProps = {
      bundling: {
        minify: true,
        externalModules: ["aws-sdk"],
      },
      runtime: lambda.Runtime.NODEJS_16_X,
      tracing: lambda.Tracing.ACTIVE, // Activa el X-Ray tracing para la función Lambda
      logRetention: RetentionDays.ONE_DAY,
      memorySize: 1024,
      role: lambdaRole,
    };

    const cloudwatchPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["logs:*"],
      resources: ["*"],
    });
    lambdaRole.addToPolicy(cloudwatchPolicy);
    const fakeLambda = new NodejsFunction(this, "FuncUsuario", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "funcUsuario",
      functionName: `${this.stackName}-FuncUsuario`,
      entry: path.join(__dirname, `/../src/lambda/funcUsuario.ts`),
      environment: {
        BASE_URL: BASE_URL,
      },
      ...LAMBDA_CONFIGURATION,
    });

    const fakeApi = new apigateway.RestApi(this, "ApiRestFake");

    fakeApi.root
      .resourceForPath("funcUsuario")
      .addMethod("POST", new apigateway.LambdaIntegration(fakeLambda));

  }
}
