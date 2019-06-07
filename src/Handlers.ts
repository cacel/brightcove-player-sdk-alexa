'use strict';

export const PLAYER_INTENTS = {
  PresentationIntent: 'BCOVPresentationIntent',
  PlayVideoIntent: 'BCOVPlayVideoIntent',
  SearchPlaylistIntent: 'BCOVSearchPlaylistIntent',
  SearchVideoIntent: 'BCOVSearchVideoIntent',
  SearchRelatedIntent: 'BCOVSearchRelatedIntent',
  SessionEndedRequest: 'SessionEndedRequest',
  PauseIntent: 'AMAZON.PauseIntent',
  ResumeIntent: 'AMAZON.ResumeIntent',
  NextIntent: 'AMAZON.NextIntent',
  PreviousIntent: 'AMAZON.PreviousIntent',
  StopIntent: 'AMAZON.StopIntent',
  CancelIntent: 'AMAZON.CancelIntent',
  HelpIntent: 'AMAZON.HelpIntent',
  ScrollDownIntent: 'AMAZON.ScrollDownIntent',
  ScrollUpIntent: 'AMAZON.ScrollUpIntent',
  ScrollLeftIntent: 'AMAZON.ScrollLeftIntent',
  ScrollRightIntent: 'AMAZON.ScrollRightIntent',
  MoreIntent: 'AMAZON.MoreIntent',
  PageDownIntent: 'AMAZON.PageDownIntent',
  PageUpIntent: 'AMAZON.PageUpIntent',
  NavigateSettingsIntent: 'AMAZON.NavigateSettingsIntent',
  YesIntent: 'AMAZON.YesIntent',
  NoIntent: 'AMAZON.YesIntent',
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
