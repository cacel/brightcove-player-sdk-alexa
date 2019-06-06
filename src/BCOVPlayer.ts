'use strict';

import { BCOVPlaybackService } from './BCOVPlaybackService';
import { SkillBuilders } from 'ask-sdk-core';
import { LambdaHandler } from 'ask-sdk-core/dist/skill/factory/BaseSkillFactory';
import { LaunchRequestHandler } from './LaunchRequestHandler';
import { PlayRequestHandler } from './PlayRequestHandler';

class BCOVPlayer {
  public readonly accountId: string;
  public readonly policyKey: string;

  private readonly playbackService: BCOVPlaybackService;

  constructor(accountId: string, policyKey: string) {
    this.accountId = accountId;
    this.policyKey = policyKey;
    this.playbackService = new BCOVPlaybackService(this.accountId, this.policyKey);
  }

  public getLambda(): LambdaHandler {
    return SkillBuilders.custom()
      .addRequestHandlers(new LaunchRequestHandler(this.playbackService), new PlayRequestHandler())
      .addErrorHandlers()
      .lambda();
  }
}

export { BCOVPlayer };
