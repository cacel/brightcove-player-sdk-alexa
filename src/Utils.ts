'use strict';

import { HandlerInput } from 'ask-sdk-core';

class Utils {
  public static supportsDisplay(handlerInput: HandlerInput): boolean {
    const hasDisplay =
      (handlerInput.requestEnvelope.context &&
        handlerInput.requestEnvelope.context.System &&
        handlerInput.requestEnvelope.context.System.device &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display !== 'undefined') ||
      false;
    return hasDisplay;
  }
}

export { Utils };
