'use strict';

import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { PLAYER_INTENTS } from '../Handlers';

class StartOverRequestHandler implements RequestHandler {
    public canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return (
            request.type === 'PlaybackController.NextCommandIssued' ||
            (request.type === 'IntentRequest' && request.intent.name === PLAYER_INTENTS.NextIntent)
        );
    }
    public handle(handlerInput: HandlerInput): Response {
        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .addDelegateDirective({
                name: 'BCOVPlayVideoIntent',
                confirmationStatus: 'NONE',
                slots: {},
            })
            .getResponse();
    }
}

export { StartOverRequestHandler };
