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
    if (Object.keys(attributes).length === 0) {
      attributes.playbackService = this.playbackService;
    }
    attributesManager.setSessionAttributes(attributes);

    const ssml = require('ssml');
    const ssmlDoc = new ssml();
    const speechOutput = ssmlDoc.say('This is a great voice application!')
      .break(500)
      .prosody({ rate: '0.8' })
      .say('Awkward pause')
      .toString();

    return responseBuilder
      .speak(speechOutput)
      .getResponse();
  }
}

export { LaunchRequestHandler };
