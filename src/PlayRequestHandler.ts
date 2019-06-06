'use strict';

import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { BCOVPlaybackService } from './BCOVPlaybackService';

class PlayRequestHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'PlayRequestHandler';
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const attributes = await attributesManager.getSessionAttributes();

    let say = `playing video, the lenght of videos is`;

    if (attributes.lenght) {
      const playbackService = attributes.playbackService as BCOVPlaybackService;
      const t = await playbackService.findVideos({ q: 'axwell' });
      say = `playing ${t.length}`;
    }
    /*const playbackService = handlerInput.attributesManager.getSessionAttributes() as BCOVPlaybackService;
    const param = {
      q: 'testing',
    };
    const values = await playbackService.findVideos();
    const value = await playbackService.findVideos(param);*/



    return responseBuilder
      .speak(say)
      .reprompt('hola')
      .getResponse();
  }
}

export { PlayRequestHandler };
