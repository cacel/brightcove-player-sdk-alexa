'use strict';

import { SkillBuilders } from 'ask-sdk-core';
import { LambdaHandler } from 'ask-sdk-core/dist/skill/factory/BaseSkillFactory';
import { BCOVPlaybackServiceData } from './BCOVPlaybackService';
import { LaunchRequestHandler } from './LaunchRequestHandler';
import {
  BCOVPresentationIntent,
  BCOVSearchPlaylistIntent,
  BCOVSearchVideoIntent,
  BCOVSearchRelatedIntent,
} from './BCOVIntents';

class BCOVPlayer {
  public readonly playbackService: BCOVPlaybackServiceData;

  constructor(playbackService: BCOVPlaybackServiceData) {
    this.playbackService = playbackService;
  }

  public getLambda(): LambdaHandler {
    return SkillBuilders.custom()
      .addRequestHandlers(
        new LaunchRequestHandler(this.playbackService),
        new BCOVPresentationIntent(),
        new BCOVSearchPlaylistIntent(),
        new BCOVSearchVideoIntent(),
        new BCOVSearchRelatedIntent(),
      )
      .addErrorHandlers()
      .lambda();
  }
}

export { BCOVPlayer };
