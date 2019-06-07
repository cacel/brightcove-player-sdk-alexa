'use strict';

import { BCOVPlaybackServiceData } from '../BCOVPlaybackService';
import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { ssml, renderXml } from 'fluent-ssml';

class LaunchRequestHandler implements RequestHandler {
  private readonly playbackService: BCOVPlaybackServiceData;

  constructor(playbackService: BCOVPlaybackServiceData) {
    this.playbackService = playbackService;
  }

  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;

    const attributes = (await attributesManager.getSessionAttributes()) || {};
    if (Object.keys(attributes).length === 0) {
      attributes.playbackService = this.playbackService;
    }
    attributesManager.setSessionAttributes(attributes);

    const speechOut = ssml().say('Welcome to Brightcove Player.');

    return responseBuilder.speak(renderXml(speechOut)).getResponse();
  }
}

export { LaunchRequestHandler };
