'use strict';

import { BCOVPlaybackServiceData } from '../BCOVPlaybackService';
import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

class LaunchRequestHandler implements RequestHandler {
  private readonly playbackService: BCOVPlaybackServiceData;

  constructor(playbackService: BCOVPlaybackServiceData) {
    this.playbackService = playbackService;
  }

  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;

    const attributes = await attributesManager.getSessionAttributes() || {};
    attributes.playbackService = this.playbackService;
    attributesManager.setSessionAttributes(attributes);

    const speechOut = 'Welcome to Brightcove Player.';

    return responseBuilder
      .speak(speechOut)
      .reprompt('')
      .getResponse();
  }
}

export { LaunchRequestHandler };
