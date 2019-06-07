'use strict';

import { SkillBuilders } from 'ask-sdk-core';
import { LambdaHandler } from 'ask-sdk-core/dist/skill/factory/BaseSkillFactory';
import { BCOVPlaybackServiceData } from './BCOVPlaybackService';
import {
  BCOVPresentationIntent,
  BCOVPlayVideoIntent,
  BCOVSearchPlaylistIntent,
  BCOVSearchVideoIntent,
  BCOVSearchRelatedIntent,
  LaunchRequestHandler,
  ExitRequestHandler,
  SessionEndedRequestHandler,
  HelpRequestHandler
} from './Intents';
import { ErrorRequestHandler } from './AmazonIntents/ErrorRequestHandler';

class BCOVPlayer {
  public readonly playbackService: BCOVPlaybackServiceData;

  constructor(playbackService: BCOVPlaybackServiceData) {
    this.playbackService = playbackService;
  }

  public getLambda(): LambdaHandler {
    return SkillBuilders.custom()
      .addRequestHandlers(
        new LaunchRequestHandler(this.playbackService),
        // new BCOVPresentationIntent(),
        new BCOVPlayVideoIntent(),
        /*  new BCOVSearchPlaylistIntent(),
          new BCOVSearchVideoIntent(),
          new BCOVSearchRelatedIntent(),*/
        new HelpRequestHandler(),
        new ExitRequestHandler(),
        new SessionEndedRequestHandler()
      )
      .addErrorHandlers(
        new ErrorRequestHandler()
      )
      .lambda();
  }
}

export { BCOVPlayer };
