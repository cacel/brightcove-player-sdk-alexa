'use strict';

export const PLAYER_INTENTS = {
  // Amazon Intents
  CancelIntent: 'AMAZON.CancelIntent',
  HelpIntent: 'AMAZON.HelpIntent',
  LoopOffIntent: 'AMAZON.LoopOffIntent',
  LoopOnIntent: 'AMAZON.LoopOnIntent',
  NextIntent: 'AMAZON.NextIntent',
  NoIntent: 'AMAZON.NoIntent',
  PauseIntent: 'AMAZON.PauseIntent',
  PreviousIntent: 'AMAZON.PreviousIntent',
  RepeatIntent: 'AMAZON.RepeatIntent',
  ResumeIntent: 'AMAZON.ResumeIntent',
  ShuffleOffIntent: 'AMAZON.ShuffleOffIntent',
  ShuffleOnIntent: 'AMAZON.ShuffleOnIntent',
  StartOverIntent: 'AMAZON.StartOverIntent',
  StopIntent: 'AMAZON.StopIntent',
  YesIntent: 'AMAZON.YesIntent',

  // Brightcove Player
  SearchVideoIntent: 'BCOVSearchVideoIntent',
  SearchRelatedIntent: 'BCOVSearchRelatedIntent',
  SearchPlaylistIntent: 'BCOVSearchPlaylistIntent',
  PlayVideoIntent: 'BCOVPlayVideoIntent',
};

export const REQUEST_TYPES = {
  // Amazon
  ExceptionEncountered: 'System.ExceptionEncountered',
  LaunchRequest: 'LaunchRequest',
  IntentRequest: 'IntentRequest',
  SessionEndedRequest: 'SessionEndedRequest',

  // PlaybackController
  PlayCommandIssued: 'PlaybackController.PlayCommandIssued',
  PauseCommandIssued: 'PlaybackController.PauseCommandIssued',
  NextCommandIssued: 'PlaybackController.NextCommandIssued',
  PreviousCommandIssued: 'PlaybackController.PreviousCommandIssued',

  // AudioPlayer
  PlaybackStarted: 'AudioPlayer.PlaybackStarted',
  PlaybackStopped: 'AudioPlayer.PlaybackStopped',
  PlaybackFinished: 'AudioPlayer.PlaybackFinished',
  PlaybackNearlyFinished: 'AudioPlayer.PlaybackNearlyFinished',
  PlaybackFailed: 'AudioPlayer.PlaybackFailed'

};

export { BCOVPlayVideoIntent } from './Handlers/BCOVPlayVideoIntent';
export { BCOVPresentationIntent } from './Handlers/BCOVPresentationIntent';
export { BCOVSearchPlaylistIntent } from './Handlers/BCOVSearchPlaylistIntent';
export { BCOVSearchRelatedIntent } from './Handlers/BCOVSearchRelatedIntent';
export { BCOVSearchVideoIntent } from './Handlers/BCOVSearchVideoIntent';
export { ErrorRequestHandler } from './Handlers/ErrorRequestHandler';
export { ExitRequestHandler } from './Handlers/ExitRequestHandler';
export { HelpRequestHandler } from './Handlers/HelpRequestHandler';
export { LaunchRequestHandler } from './Handlers/LaunchRequestHandler';
export { NextPlaybackHandler } from './Handlers/NextPlaybackRequestHandler';
export { NoRequestHandler } from './Handlers/NoRequestHandler';
export { SessionEndedRequestHandler } from './Handlers/SessionEndedRequestHandler';
export { StartOverRequestHandler } from './Handlers/StartOverRequestHandler';
export { SystemExceptionHandler } from './Handlers/SystemExceptionHandler';
export { YesRequestHandler } from './Handlers/YesRequestHandler';
