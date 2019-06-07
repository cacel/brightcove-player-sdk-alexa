'use strict';

import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
import { BCOVPlaybackService, Video } from '../BCOVPlaybackService';
import { PLAYER_INTENTS } from '../Handlers';
import { Utils, MediaData } from '../Utils';

class BCOVPlayVideoIntent implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      (request.intent.name === PLAYER_INTENTS.PlayVideoIntent
        || request.intent.name === PLAYER_INTENTS.StartOverIntent);
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const attributes = await attributesManager.getSessionAttributes();
    const playbackService = attributes.playbackService;

    const supportVideo = Utils.supportVideo(handlerInput);
    const supportAudio = Utils.supportAudio(handlerInput);

    let msg = '';

    if (supportVideo || supportAudio) {
      const request = (handlerInput.requestEnvelope.request as IntentRequest);
      const query = request.intent.slots !== undefined ? request.intent.slots.Query.value : '';
      const playlist = await BCOVPlaybackService.findVideos(playbackService, { q: query });

      if (playlist.length > 0) {
        const videoToPlay = playlist[0];
        delete attributes['playlist'];
        playlist.shift()
        attributes.playlist = playlist;
        attributes.videoId = videoToPlay.id;

        const media: MediaData = await Utils.getMedia(videoToPlay.src);
        if (supportVideo && media.isVideoSupported) {
          responseBuilder
            .addVideoAppLaunchDirective(videoToPlay.src, videoToPlay.title);
        } else {
          responseBuilder
            .addAudioPlayerPlayDirective('REPLACE_ALL', media.audioUrl, videoToPlay.id, 0, '');
        }
      } else {
        msg = 'No media to play.';
      }
    } else {
      msg = 'Device cannot reproduce media.';
    }

    return responseBuilder
      .speak(msg)
      .getResponse();
  }
}

export { BCOVPlayVideoIntent };
