import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";
export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const powertoolsLayer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      "PowertoolsLayer",
      `arn:aws:lambda:${
        cdk.Stack.of(this).region
      }:094274105915:layer:AWSLambdaPowertoolsTypeScript:5`
    );

    new NodejsFunction(this, "lambda-powertools-example-function", {
      runtime: lambda.Runtime.NODEJS_16_X,

      handler: "handler",
      entry: join(
        __dirname,
        "..",
        "..",
        "..",
        "app",
        "dist",
        "manualTracedLambda.js"
      ),

      layers: [powertoolsLayer],
      bundling: {
        externalModules: [
          "aws-sdk",
          "@aws-lambda-powertools/commons",
          "@aws-lambda-powertools/logger",
          "@aws-lambda-powertools/metrics",
          "@aws-lambda-powertools/tracer",
        ],
      },
      tracing: lambda.Tracing.ACTIVE,
      environment: {},
    });
  }
}
