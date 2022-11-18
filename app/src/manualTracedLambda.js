import { Tracer } from "@aws-lambda-powertools/tracer";

const tracer = new Tracer({ serviceName: "tracerManualFnJs" });

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
  const segment = tracer.getSegment();

  const subsegment = segment.addNewSubsegment(`## ${process.env._HANDLER}`);
  tracer.setSegment(subsegment);

  tracer.annotateColdStart();
  tracer.addServiceNameAnnotation();

  tracer.putAnnotation("awsRequestId", context.awsRequestId);
  tracer.putMetadata("eventPayload", event);

  /**
   * @type {Point2D}
   */
  let res;
  try {
    res = { x: 1, y: 2 };

    tracer.addResponseAsMetadata(res, process.env._HANDLER);
  } catch (err) {
    if (err instanceof Error) {
      tracer.addErrorAsMetadata(err);
    }

    throw err;
  } finally {
    subsegment.close();

    tracer.setSegment(segment);
  }

  return res;
};
