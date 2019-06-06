'use strict';

import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { BCOVPlaybackService } from './BCOVPlaybackService';

class LaunchRequestHandler implements RequestHandler {
  private readonly playbackService: BCOVPlaybackService;

  constructor(playbackService: BCOVPlaybackService) {
    this.playbackService = playbackService;
  }

  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;

    const attributes = await attributesManager.getSessionAttributes() || {};
    if (Object.keys(attributes).length === 0) {
      attributes.playbackService = this.playbackService;
    }
    attributesManager.setSessionAttributes(attributes);

    const value = await this.playbackService.findVideos();

    const say = `welcome from typescript, the lenght of videos is ${value.length} `;

    return responseBuilder
      .speak(say)
      .getResponse();
  }
}

export { LaunchRequestHandler };
