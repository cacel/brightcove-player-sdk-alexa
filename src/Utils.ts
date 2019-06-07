'use strict';

import { HandlerInput } from 'ask-sdk-core';
import fetch from 'node-fetch';

interface Media {
  isVideo: boolean;
  uri: string;
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
    const lastPlaylist = manifest.playlists.length - 1;
    const uri = manifest.playlists[lastPlaylist].uri;

    return { isVideo: isVideo, uri: uri };
  }
}

export { Utils, Media };
