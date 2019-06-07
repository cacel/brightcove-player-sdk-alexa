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

    const supportAudio = Utils.supportAudio(handlerInput);
    const supportVideo = Utils.supportVideo(handlerInput);

    return responseBuilder.speak(`video is ${supportVideo} and audio is ${supportAudio}`).getResponse();

    /* if (playlist.length > 0) {
       videoToPlay = playlist[0];
       playlist.shift();
 
       delete attributes['playlist'];
       attributes.playlist = playlist;
       attributesManager.setSessionAttributes(attributes);
       const supportVideo = Utils.supportVideo(handlerInput);
       const supportAudio = Utils.supportAudio(handlerInput);
 /*
       if (supportVideo) {
         return responseBuilder
           
           .speak(`Playing: ${sup}`).getResponse();
       } else {
         return responseBuilder
           .speak(`video cannot be played but audio is ${supportAudio}`)
           .getResponse();
       }
     } else {
       return responseBuilder
         .speak('no videos to play')
         .getResponse();;
     }
     return responseBuilder
       .getResponse();*/
  }
}

export { BCOVPlayVideoIntent };
