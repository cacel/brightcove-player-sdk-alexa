'use strict';

import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

class SystemExceptionHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'System.ExceptionEncountered';
  }

  public handle(handlerInput: HandlerInput): Response {
    console.log('\n******************* EXCEPTION **********************');
    console.log('\n' + JSON.stringify(handlerInput.requestEnvelope, null, 2));
    const responseBuilder = handlerInput.responseBuilder;
    return responseBuilder.getResponse();
  }
}

export { SystemExceptionHandler };
