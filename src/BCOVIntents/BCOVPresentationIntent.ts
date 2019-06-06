'use strict';

import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { BCOVPlaybackService } from '../BCOVPlaybackService';

class BCOVPresentationIntent implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'BCOVPresentationIntent';
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const attributes = await attributesManager.getSessionAttributes();

    const playbackService = attributes.playbackService;
    const t = await BCOVPlaybackService.findVideos(playbackService, { q: 'axwell' });
    const say = `playing ${t.length}`;

    return responseBuilder
      .speak(say)
      .reprompt('hola')
      .getResponse();
  }
}

export { BCOVPresentationIntent };
