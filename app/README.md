## Lambda Function with Powertools

Scope of this Example Application is to experiment with the development experience od developing serverless applications
in Javascript with `JSDoc` and `Typescript` for static typing support.

Application [lambda function](./src/manualTracedLambda.js) uses

- [tracer](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/core/tracer/) of [AWS Lambda Powertools for TypeScript](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/)
- [@aws-lambda-powertools/commons](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/api/modules/_aws_lambda_powertools_commons.html) of AWS Lambda Powertools for TypeScript

Application provides strong typing for a [Model type](./src/types/model.d.ts) created as `.d.ts` Type.

[Lambda function](./src/manualTracedLambda.js) returns a response of this [Model type](./src/types/model.d.ts) when invoked and also the `response result` is added to the `trace` as metadata.

The [@aws-lambda-powertools/commons](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/api/modules/_aws_lambda_powertools_commons.html)
is decalred as module in this example application, [text](./src/types/%40aws-lambda-powertools/commons/index.d.ts)

## Separating Static from Runtime Experience

[nodejs package](package.json) defines as `type` `commonjs` for the `runtime` behavior of `nodejs 16.18.0`.

This is needed because the `powertools` is deployed as `Layer` in aws cloud.

For this reason the [Lambda function](./src/manualTracedLambda.js) is compiled as `commonjs` module with the support of [tsc compiler](./package.json) and [tsconfig.build](./tsconfig.build.json)

However during development, `static experience` with `ECMAScript` experience is used.

[Lambda function](./src/manualTracedLambda.js) uses `import` statements and `JSDoc` for `strong typing` experience

`Strong typing` experience is provided with the support of [tsc compiler](./package.json) and [tsconfig](./tsconfig.json)
