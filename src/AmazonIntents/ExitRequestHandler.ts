'use strict';

import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { PLAYER_INTENTS } from '../Intents';

class ExitRequestHandler implements RequestHandler {
    public canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && (request.intent.name === PLAYER_INTENTS.CancelIntent
                || request.intent.name === PLAYER_INTENTS.StopIntent);
    }

    public handle(handlerInput: HandlerInput): Response {
        const responseBuilder = handlerInput.responseBuilder;

        return responseBuilder
            .speak(`Good bye!`)
            .withShouldEndSession(true)
            .getResponse();
    }
}

export { ExitRequestHandler };