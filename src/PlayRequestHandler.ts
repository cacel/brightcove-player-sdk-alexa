'use strict';

import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { BCOVPlaybackService } from './BCOVPlaybackService';

class PlayRequestHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'PlayRequestHandler';
  }

  public handle(handlerInput: HandlerInput): Response {
    const responseBuilder = handlerInput.responseBuilder;
    /*const playbackService = handlerInput.attributesManager.getSessionAttributes() as BCOVPlaybackService;
    const param = {
      q: 'testing',
    };
    const values = await playbackService.findVideos();
    const value = await playbackService.findVideos(param);*/

    const say = `playing video, the lenght of videos is`;

    return responseBuilder
      .speak(say)
      .reprompt('hola')
      .getResponse();
  }
}

export { PlayRequestHandler };
