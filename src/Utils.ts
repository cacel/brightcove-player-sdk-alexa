'use strict';

import { HandlerInput } from 'ask-sdk-core';
import fetch from 'node-fetch';

interface MediaData {
  isVideoSupported: boolean;
  audioUrl: string;
}

class Utils {
  public static supportVideo(handlerInput: HandlerInput) {
    const supported =
      handlerInput.requestEnvelope.context.System.device &&
      handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
      handlerInput.requestEnvelope.context.System.device.supportedInterfaces.VideoApp;
    return Boolean(supported);
  }

  public static supportAudio(handlerInput: HandlerInput) {
    const supported =
      handlerInput.requestEnvelope.context.System.device &&
      handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
      handlerInput.requestEnvelope.context.System.device.supportedInterfaces.AudioPlayer;
    return Boolean(supported);
  }

  public static async getMedia(urlManifest: string) {
    const response = await fetch(urlManifest);
    const masterManifest = await response.text();

    const m3u8 = require('m3u8-parser');
    const parser = new m3u8.Parser();

    parser.push(masterManifest);
    parser.end();

    const manifest = parser.manifest;

    const isVideo = manifest.playlists[0].attributes.hasOwnProperty('RESOLUTION');

    const mediaAudio = Object.keys(manifest.mediaGroups.AUDIO).length - 1;
    const audio = Object.values(manifest.mediaGroups.AUDIO)[mediaAudio] as object;
    const audioTrack = Object.values(audio)[0];
    const url = audioTrack.uri;

    const media = {
      isVideoSupported: isVideo,
      audioUrl: url,
    } as MediaData;

    return media;
  }
}

export { Utils, MediaData };
