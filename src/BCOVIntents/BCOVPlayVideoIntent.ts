'use strict';

import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { BCOVPlaybackService, Video } from '../BCOVPlaybackService';
import { PLAYER_INTENTS } from '../Intents'

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
    let videos: Video[];
    if (attributes.hasOwnProperty('search')) {
      videos = await BCOVPlaybackService.findVideos(playbackService, { q: 'axwell' });
    } else if (attributes.hasOwnProperty('related')) {
      const videoId = attributes.related;
      videos = await BCOVPlaybackService.findVideosRelated(playbackService, videoId);
    } else {
      videos = await BCOVPlaybackService.findVideos(playbackService);
    }

    if (videos.length > 0) {
      videoToPlay = videos[0];
      responseBuilder.addVideoAppLaunchDirective(
        videoToPlay.src,
        videoToPlay.title
      ).speak(`Playing: ${videoToPlay.title}`);
    }

    return responseBuilder
      .getResponse();
  }
}

export { BCOVPlayVideoIntent };