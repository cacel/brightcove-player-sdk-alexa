'use strict';

import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
import { BCOVPlaybackService, Video } from '../BCOVPlaybackService';
import { PLAYER_INTENTS } from '../Handlers';
import { Utils, MediaData } from '../Utils';

class PlaybackNearlyFinished implements RequestHandler {
    public canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'AudioPlayer.PlaybackNearlyFinished';
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
            const playlist = attributes.playlist;

            if (playlist !== 'undefined' && playlist.length > 0) {
                const videoToPlay = playlist[0];
                delete attributes['playlist'];
                const previousId = attributes.videoId;
                playlist.shift()
                attributes.playlist = playlist;
                attributes.videoId = videoToPlay.id;
                const media: MediaData = await Utils.getMedia(videoToPlay.src);
                if (supportVideo && media.isVideoSupported) {
                    responseBuilder
                        .addAudioPlayerPlayDirective('ENQUEUE', media.audioUrl, videoToPlay.id, 0, previousId);
                } else {
                    responseBuilder
                        .addAudioPlayerPlayDirective('ENQUEUE', media.audioUrl, videoToPlay.id, 0, previousId);
                }
            } else {
                msg = 'No videos related';
            }
        } else {
            msg = 'Device cannot reproduce media.';
        }

        return responseBuilder
            .speak(msg)
            .getResponse();
    }
}

export { PlaybackNearlyFinished };
