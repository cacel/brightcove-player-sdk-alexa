'use strict';

import { BCOVPlaybackService } from '../BCOVPlaybackService';
import { PLAYER_INTENTS } from '../Handlers';
import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';

class BCOVSearchVideoIntent implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === PLAYER_INTENTS.SearchVideoIntent;
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const attributes = await attributesManager.getSessionAttributes();
    const playbackService = attributes.playbackService;
    const request = (handlerInput.requestEnvelope.request as IntentRequest);
    const query = request.intent.slots !== undefined ? request.intent.slots.Query.value : '';
    const playlist = await BCOVPlaybackService.findVideos(playbackService, { q: query });

    if (playlist.length > 0) {
      attributes.playlist = playlist;
      return responseBuilder
        .addDelegateDirective({
          name: PLAYER_INTENTS.PlayVideoIntent,
          confirmationStatus: 'NONE',
          slots: {}
        })
        .getResponse();
    } else {
      const say = `I could not find any media using ${query}. Please try again`;
      return responseBuilder
        .speak(say)
        .getResponse();
    }
  }
}

export { BCOVSearchVideoIntent };
