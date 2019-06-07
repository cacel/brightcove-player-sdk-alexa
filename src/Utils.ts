'use strict';

import { HandlerInput } from 'ask-sdk-core';

class Utils {
  public static supportVideo(handlerInput: HandlerInput) {
    const supported =
      handlerInput.requestEnvelope.context.System.device &&
      handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
      handlerInput.requestEnvelope.context.System.device.supportedInterfaces.VideoApp;
    return Boolean(supported);
  }

  public static supportAudio(handlerInput: HandlerInput) {
    const supported =
      handlerInput.requestEnvelope.context.System.device &&
      handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
      handlerInput.requestEnvelope.context.System.device.supportedInterfaces.AudioPlayer;
    return Boolean(supported);
  }
}

export { Utils };
