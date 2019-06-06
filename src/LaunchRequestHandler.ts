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
    const responseBuilder = handlerInput.responseBuilder;
    const value = await this.playbackService.findVideos();
    const say = `welcome from typescript, the lenght of videos is ${value.length} `;

    handlerInput.attributesManager.setSessionAttributes({
      playbackService: this.playbackService,
    });

    return responseBuilder.speak(say).getResponse();
  }
}

export { LaunchRequestHandler };
