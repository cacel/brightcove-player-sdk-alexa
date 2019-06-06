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
        const responseBuilder = handlerInput.responseBuilder;
        const playbackService = handlerInput.attributesManager.getSessionAttributes() as BCOVPlaybackService;
        const param = {
            q: 'testing'
        };
        const values = await playbackService.findVideos();
        const value = await playbackService.findVideos(param);

        const say = `welcome from typescript, the lenght of videos is ${values.length} and testing: ${value.length}`;

        return responseBuilder.speak(say)
            .getResponse();
    }

}

export { PlayRequestHandler };
