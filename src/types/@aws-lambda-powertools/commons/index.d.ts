import { Events } from "@aws-lambda-powertools/commons";

declare module "@aws-lambda-powertools/commons" {
  export type CustomEvent = typeof Events.Custom.CustomEvent;
}
