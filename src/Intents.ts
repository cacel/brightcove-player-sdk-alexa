'use strict';

export const playerIntents = {
    BCOVPresentationIntent: 'BCOVPresentationIntent',
    BCOVSearchPlaylistIntent: 'BCOVSearchPlaylistIntent',
    BCOVSearchVideoIntent: 'BCOVSearchVideoIntent',
    BCOVSearchRelatedIntent: 'BCOVSearchRelatedIntent',
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
};

export { BCOVPresentationIntent } from './BCOVIntents/BCOVPresentationIntent';
export { BCOVSearchPlaylistIntent } from './BCOVIntents/BCOVSearchPlaylistIntent';
export { BCOVSearchVideoIntent } from './BCOVIntents/BCOVSearchVideoIntent';
export { BCOVSearchRelatedIntent } from './BCOVIntents/BCOVSearchRelatedIntent';
export { LaunchRequestHandler } from './AmazonIntents/LaunchRequestHandler';
