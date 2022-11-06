import { Tracer } from "@aws-lambda-powertools/tracer";

const tracer = new Tracer({ serviceName: "tracerManualFnJs" });
// Alternatively, you can also set the service name using the POWERTOOLS_SERVICE_NAME environment variable
// Learn more at: https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html

/**
 * @typedef {import("./types/model").Point2D} Point2D
 */

/**
 *
 * @param {import("@aws-lambda-powertools/commons").CustomEvent} event
 * @param {import("aws-lambda").Context} context
 * @returns {Promise<Point2D>}
 */
export const handler = async (event, context) => {
  const segment = tracer.getSegment(); // This is the facade segment (the one that is created by AWS Lambda)
  // Create subsegment for the function & set it as active
  const subsegment = segment.addNewSubsegment(`## ${process.env._HANDLER}`);
  tracer.setSegment(subsegment);

  // Annotate the subsegment with the cold start & serviceName
  tracer.annotateColdStart();
  tracer.addServiceNameAnnotation();

  // Add custom annotation & metadata
  tracer.putAnnotation("awsRequestId", context.awsRequestId);
  tracer.putMetadata("eventPayload", event);

  /**
   * @type {Point2D}
   */
  let res;
  try {
    res = { x: 1, y: 2 };
    // Add the response as metadata
    tracer.addResponseAsMetadata(res, process.env._HANDLER);
  } catch (err) {
    // Add the error as metadata
    if (err instanceof Error) {
      tracer.addErrorAsMetadata(err);
    }

    throw err;
  } finally {
    // Close subsegment (the AWS Lambda one is closed automatically)
    subsegment.close();
    // Set the facade segment as active again
    tracer.setSegment(segment);
  }

  return res;
};
