'use strict';

import { Request } from './Request';
import { vsprintf } from 'sprintf-js';
import * as url from 'url';

const kBCOVPlaybackServiceRequestFactoryBaseUrl: string = 'https://edge.api.brightcove.com/playback/v1';
const kBCOVPlaybackServiceRequestFactoryResourceRefId: string = '/ref:';
const kBCOVPlaybackServiceRequestFactoryResourceAccounts: string = '/accounts';
const kBCOVPlaybackServiceRequestFactoryResourceVideos: string = '/videos';
const kBCOVPlaybackServiceRequestFactoryResourcePlaylists: string = '/playlists';
const kBCOVPlaybackServiceRequestFactoryResourceRelated: string = '/related';
const kBCOVPlaybackServiceRequestFactoryPolicyHeader: string = 'BCOV-POLICY';

interface BCOVPlaybackServiceData {
  accountId: string;
  policyKey: string;
  baseUrlStr?: string;
}

interface Video {
  id: string;
  src: string;
  title: string;
  tags: string[];
}

interface Source {
  src: string;
  type: string;
}

class BCOVPlaybackService {
  public static findVideos(data: BCOVPlaybackServiceData, parameters: object = {}): Promise<Video[]> {
    const urlStr = BCOVPlaybackService.baseVideoRequestStringWithSuffix(data, '', parameters);
    const policyKey = data.policyKey;
    const requestParams = {
      headers: {
        [kBCOVPlaybackServiceRequestFactoryPolicyHeader]: policyKey,
      },
    };
    return Request.get(urlStr, requestParams)
      .then(BCOVPlaybackService.parsePlaylist)
      .catch(BCOVPlaybackService.parsePlaylist);
  }

  public static findVideoWithVideoId(
    data: BCOVPlaybackServiceData,
    videoId: string,
    parameters: object = {},
  ): Promise<Video[]> {
    const videoIdPathComponent = vsprintf('/%s', [videoId]);
    const urlStr = BCOVPlaybackService.baseVideoRequestStringWithSuffix(data, videoIdPathComponent, parameters);
    const policyKey = data.policyKey;
    const requestParams = {
      headers: {
        [kBCOVPlaybackServiceRequestFactoryPolicyHeader]: policyKey,
      },
    };
    return Request.get(urlStr, requestParams)
      .then(BCOVPlaybackService.parseVideo)
      .catch(BCOVPlaybackService.parseVideo);
  }

  public static findVideoWithReferenceId(
    data: BCOVPlaybackServiceData,
    referenceId: string,
    parameters: object = {},
  ): Promise<Video[]> {
    const videoReferenceIdPathComponent = vsprintf('%s%s', [
      kBCOVPlaybackServiceRequestFactoryResourceRefId,
      referenceId,
    ]);
    const urlStr = BCOVPlaybackService.baseVideoRequestStringWithSuffix(
      data,
      videoReferenceIdPathComponent,
      parameters,
    );
    const policyKey = data.policyKey;
    const requestParams = {
      headers: {
        [kBCOVPlaybackServiceRequestFactoryPolicyHeader]: policyKey,
      },
    };
    return Request.get(urlStr, requestParams)
      .then(BCOVPlaybackService.parseVideo)
      .catch(BCOVPlaybackService.parseVideo);
  }

  public static findVideosRelated(
    data: BCOVPlaybackServiceData,
    videoId: string,
    parameters: object = {},
  ): Promise<Video[]> {
    const videoIdPathComponent = vsprintf('/%s%s', [videoId, kBCOVPlaybackServiceRequestFactoryResourceRelated]);
    const urlStr = BCOVPlaybackService.baseVideoRequestStringWithSuffix(data, videoIdPathComponent, parameters);
    const policyKey = data.policyKey;
    const requestParams = {
      headers: {
        [kBCOVPlaybackServiceRequestFactoryPolicyHeader]: policyKey,
      },
    };
    return Request.get(urlStr, requestParams)
      .then(BCOVPlaybackService.parsePlaylist)
      .catch(BCOVPlaybackService.parsePlaylist);
  }

  public static findPlaylistWithPlaylistId(
    data: BCOVPlaybackServiceData,
    playlistId: string,
    parameters: object = {},
  ): Promise<Video[]> {
    const playlistIdPathComponent = vsprintf('/%s', [playlistId]);
    const urlStr = BCOVPlaybackService.basePlaylistRequestStringWithSuffix(data, playlistIdPathComponent, parameters);
    const policyKey = data.policyKey;
    const requestParams = {
      headers: {
        [kBCOVPlaybackServiceRequestFactoryPolicyHeader]: policyKey,
      },
    };
    return Request.get(urlStr, requestParams)
      .then(BCOVPlaybackService.parsePlaylist)
      .catch(BCOVPlaybackService.parsePlaylist);
  }

  public static findPlaylistWithReferenceId(
    data: BCOVPlaybackServiceData,
    referenceId: string,
    parameters: object = {},
  ): Promise<Video[]> {
    const playlistReferenceIdPathComponent = vsprintf('%s%s', [
      kBCOVPlaybackServiceRequestFactoryResourceRefId,
      referenceId,
    ]);
    const urlStr = BCOVPlaybackService.basePlaylistRequestStringWithSuffix(
      data,
      playlistReferenceIdPathComponent,
      parameters,
    );
    const policyKey = data.policyKey;
    const requestParams = {
      headers: {
        [kBCOVPlaybackServiceRequestFactoryPolicyHeader]: policyKey,
      },
    };
    return Request.get(urlStr, requestParams)
      .then(BCOVPlaybackService.parsePlaylist)
      .catch(BCOVPlaybackService.parsePlaylist);
  }

  private static encodedRequestParameterString(parameters: object): string {
    const parameterString: string = Object.entries(parameters)
      .map(([key, value]) => {
        if (typeof key !== 'string') {
          key = vsprintf('%s', [key]);
        }
        if (typeof value !== 'string') {
          value = vsprintf('%s', [value]);
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');
    return vsprintf('?%s', [parameterString]);
  }

  private static basePlaylistRequestStringWithSuffix(
    data: BCOVPlaybackServiceData,
    suffix: string,
    parameters: object,
  ): string {
    const baseUrlStr = data.baseUrlStr || kBCOVPlaybackServiceRequestFactoryBaseUrl;
    const accountId = data.accountId;
    if (parameters && Object.keys(parameters).length) {
      const encodedParameters = BCOVPlaybackService.encodedRequestParameterString(parameters);
      return vsprintf('%s%s/%s%s%s%s', [
        baseUrlStr,
        kBCOVPlaybackServiceRequestFactoryResourceAccounts,
        accountId,
        kBCOVPlaybackServiceRequestFactoryResourcePlaylists,
        suffix,
        encodedParameters,
      ]);
    }
    return vsprintf('%s%s/%s%s%s', [
      baseUrlStr,
      kBCOVPlaybackServiceRequestFactoryResourceAccounts,
      accountId,
      kBCOVPlaybackServiceRequestFactoryResourcePlaylists,
      suffix,
    ]);
  }

  private static baseVideoRequestStringWithSuffix(
    data: BCOVPlaybackServiceData,
    suffix: string,
    parameters: object,
  ): string {
    const baseUrlStr = data.baseUrlStr || kBCOVPlaybackServiceRequestFactoryBaseUrl;
    const accountId = data.accountId;
    if (parameters && Object.keys(parameters).length) {
      const encodedParameters = BCOVPlaybackService.encodedRequestParameterString(parameters);
      return vsprintf('%s%s/%s%s%s%s', [
        baseUrlStr,
        kBCOVPlaybackServiceRequestFactoryResourceAccounts,
        accountId,
        kBCOVPlaybackServiceRequestFactoryResourceVideos,
        suffix,
        encodedParameters,
      ]);
    }
    return vsprintf('%s%s/%s%s%s', [
      baseUrlStr,
      kBCOVPlaybackServiceRequestFactoryResourceAccounts,
      accountId,
      kBCOVPlaybackServiceRequestFactoryResourceVideos,
      suffix,
    ]);
  }

  private static filterByHlsAndProtocol(source: Source): boolean {
    const urlObj = url.parse(source.src);
    if (source.type === 'application/x-mpegURL' && urlObj.protocol === 'https:') {
      return true;
    }
    return false;
  }

  private static parsePlaylist(playlist: any): Video[] {
    if (playlist.hasOwnProperty('videos')) {
      const videos: Video[] = [];
      playlist.videos.forEach((video: any) => {
        const source = video.sources.find(BCOVPlaybackService.filterByHlsAndProtocol);
        if (typeof source !== 'undefined') {
          videos.push({
            id: video.id,
            title: video.name,
            src: source.src,
            tags: video.tags,
          });
        }
      });
      return videos;
    }
    console.error(`Error: ${playlist[0].error_code}`);
    return [];
  }

  private static parseVideo(video: any): Video[] {
    if (video.hasOwnProperty('name') && video.hasOwnProperty('sources')) {
      let objVideo = {} as Video;
      const source = video.sources.find(BCOVPlaybackService.filterByHlsAndProtocol);
      if (typeof source !== 'undefined') {
        objVideo = {
          id: video.id,
          title: video.name,
          src: source.src,
          tags: video.tags,
        };
        return [objVideo];
      }
    } else {
      console.error(`Error: ${video[0].error_code}`);
    }
    return [];
  }
}

export { BCOVPlaybackService, BCOVPlaybackServiceData, Video };
