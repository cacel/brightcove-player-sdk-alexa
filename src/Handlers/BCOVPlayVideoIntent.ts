'use strict';

import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { BCOVPlaybackService, Video } from '../BCOVPlaybackService';
import { REQUEST_TYPES, PLAYER_INTENTS } from '../Handlers';
import { Utils, MediaData } from '../Utils';

class BCOVPlayVideoIntent implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return true; //request.type === 'LaunchRequest' && request.intent.name === PLAYER_INTENTS.PlayVideoIntent;
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

    let msg = 'No media to play.';
    if (playlist.length > 0) {
      if (supportVideo || supportAudio) {
        videoToPlay = playlist[0];
        playlist.shift();

        delete attributes['playlist'];
        attributes.playlist = playlist;
        attributesManager.setSessionAttributes(attributes);

        const media: MediaData = await Utils.getMedia(videoToPlay.src);

        if (supportVideo && media.isVideoSupported) {
          responseBuilder.addVideoAppLaunchDirective(videoToPlay.src, videoToPlay.title);
        } else {
          responseBuilder.addAudioPlayerPlayDirective('REPLACE_ALL', media.audioUrl, videoToPlay.id, 0);
        }
        return responseBuilder.getResponse();
      } else {
        msg = 'Device cannot reproduce media.';
      }
    }

    return responseBuilder.speak(msg).getResponse();
  }
}

export { BCOVPlayVideoIntent };
