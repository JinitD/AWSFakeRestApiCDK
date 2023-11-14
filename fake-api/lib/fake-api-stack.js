"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeApiStack = void 0;
const cdk = require("aws-cdk-lib");
const path = require("path");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigw = require("aws-cdk-lib/aws-apigateway");
const env_config_1 = require("../env.config");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class FakeApiStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const fakeLambda = new lambda.Function(this, "FakeLambda", {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: "handler.fakeLambda",
            code: lambda.Code.fromAsset(path.resolve(__dirname, "lambda")),
            environment: {
                API_FAKE: env_config_1.environment.api,
            },
        });
        const fakeApi = new apigw.RestApi(this, "fakeApi");
        fakeApi.root
            .resourceForPath("fakeApi")
            .addMethod("POST", new apigw.LambdaIntegration(fakeLambda));
    }
}
exports.FakeApiStack = FakeApiStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZS1hcGktc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYWtlLWFwaS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFFbkMsNkJBQThCO0FBQzlCLGlEQUFpRDtBQUNqRCxvREFBb0Q7QUFDcEQsOENBQTRDO0FBQzVDLDhDQUE4QztBQUU5QyxNQUFhLFlBQWEsU0FBUSxHQUFHLENBQUMsS0FBSztJQUN6QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3pELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDOUQsV0FBVyxFQUFFO2dCQUNYLFFBQVEsRUFBRSx3QkFBVyxDQUFDLEdBQUc7YUFDMUI7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRW5ELE9BQU8sQ0FBQyxJQUFJO2FBQ1QsZUFBZSxDQUFDLFNBQVMsQ0FBQzthQUMxQixTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFFaEUsQ0FBQztDQUNGO0FBcEJELG9DQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5pbXBvcnQgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBhcGlndyBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSBcIi4uL2Vudi5jb25maWdcIjtcbi8vIGltcG9ydCAqIGFzIHNxcyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3FzJztcblxuZXhwb3J0IGNsYXNzIEZha2VBcGlTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGZha2VMYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiRmFrZUxhbWJkYVwiLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMThfWCxcbiAgICAgIGhhbmRsZXI6IFwiaGFuZGxlci5mYWtlTGFtYmRhXCIsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJsYW1iZGFcIikpLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgQVBJX0ZBS0U6IGVudmlyb25tZW50LmFwaSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBmYWtlQXBpID0gbmV3IGFwaWd3LlJlc3RBcGkodGhpcywgXCJmYWtlQXBpXCIpO1xuXG4gICAgZmFrZUFwaS5yb290XG4gICAgICAucmVzb3VyY2VGb3JQYXRoKFwiZmFrZUFwaVwiKVxuICAgICAgLmFkZE1ldGhvZChcIlBPU1RcIiwgbmV3IGFwaWd3LkxhbWJkYUludGVncmF0aW9uKGZha2VMYW1iZGEpKTtcblxuICB9XG59XG4iXX0=