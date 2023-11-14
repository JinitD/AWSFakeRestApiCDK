import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import path = require("path");
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { environment } from "../env.config";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FakeApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fakeLambda = new lambda.Function(this, "FakeLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "handler.fakeLambda",
      code: lambda.Code.fromAsset(path.resolve(__dirname, "lambda")),
      environment: {
        API_FAKE: environment.api,
      },
    });

    const fakeApi = new apigw.RestApi(this, "fakeApi");

    fakeApi.root
      .resourceForPath("fakeApi")
      .addMethod("POST", new apigw.LambdaIntegration(fakeLambda));

  }
}
