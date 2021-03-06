'use strict';

import { SkillBuilders } from 'ask-sdk-core';
import { LambdaHandler } from 'ask-sdk-core/dist/skill/factory/BaseSkillFactory';
import { BCOVPlaybackServiceData } from './BCOVPlaybackService';
import {
  BCOVPlayVideoIntent,
  BCOVPresentationIntent,
  BCOVSearchPlaylistIntent,
  BCOVSearchRelatedIntent,
  ErrorRequestHandler,
  ExitRequestHandler,
  HelpRequestHandler,
  LaunchRequestHandler,
  NextPlaybackHandler,
  NoRequestHandler,
  PlaybackNearlyFinished,
  SessionEndedRequestHandler,
  StartOverRequestHandler,
  SystemExceptionHandler,
  YesRequestHandler,
} from './Handlers';

class BCOVPlayer {
  public readonly playbackService: BCOVPlaybackServiceData;

  constructor(playbackService: BCOVPlaybackServiceData) {
    this.playbackService = playbackService;
  }

  public getLambda(): LambdaHandler {
    return SkillBuilders.custom()
      .addRequestHandlers(
        new LaunchRequestHandler(this.playbackService),
        new BCOVPlayVideoIntent(),
        new BCOVSearchRelatedIntent(),
        new PlaybackNearlyFinished(),
        new HelpRequestHandler(),
        //new StartOverRequestHandler(),
        new ExitRequestHandler(),
        new SystemExceptionHandler(),
        new SessionEndedRequestHandler(),
      )
      .addErrorHandlers(new ErrorRequestHandler())
      .lambda();
  }
}

export { BCOVPlayer };
