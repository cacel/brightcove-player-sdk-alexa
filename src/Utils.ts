'use strict';

import { HandlerInput } from 'ask-sdk-core';
import { SupportedInterfaces } from 'ask-sdk-model';

class Utils {

    public static supportDisplay(handlerInput: HandlerInput) {
        const hasDisplay =
            handlerInput.requestEnvelope.context &&
            handlerInput.requestEnvelope.context.System &&
            handlerInput.requestEnvelope.context.System.device &&
            handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
            handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
        return hasDisplay;
    }
}

export { Utils };
