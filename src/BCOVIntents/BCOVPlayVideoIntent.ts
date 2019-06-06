'use strict';

import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { BCOVPlaybackService, Video } from '../BCOVPlaybackService';
import { PLAYER_INTENTS } from '../Intents';
import { Utils } from '../Utils';

class BCOVPlayVideoIntent implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === PLAYER_INTENTS.PlayVideoIntent;
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const attributes = await attributesManager.getSessionAttributes();
    const playbackService = attributes.playbackService;

    let videoToPlay: Video;
    let playlist: Video[];

    if (attributes.hasOwnProperty('playlist')) {
      playlist = attributes.playlist;
    } else {
      playlist = await BCOVPlaybackService.findVideos(playbackService);
    }

    if (playlist.length > 0) {
      videoToPlay = playlist[0];
      playlist.shift();

      delete attributes['playlist'];
      attributes.playlist = playlist;
      attributesManager.setSessionAttributes(attributes);

      if (Utils.supportsDisplay(handlerInput)) {
        responseBuilder
          .addVideoAppLaunchDirective(videoToPlay.src, videoToPlay.title)
          .speak(`Playing: ${videoToPlay.title}`);
      } else {
        responseBuilder.speak('video cannot be played');
      }
    }

    return responseBuilder.getResponse();
  }
}

export { BCOVPlayVideoIntent };
