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
  private static filterByHlsAndProtocol(source: Source): boolean {
    const urlObj = url.parse(source.src);
    if (source.type === 'application/x-mpegURL' && urlObj.protocol === 'https:') {
      return true;
    }
    return false;
  }

  public readonly accountId: string;
  public readonly policyKey: string;
  public readonly baseUrlStr: string;
  private readonly requestParams: object;

  constructor(accountId: string, policyKey: string, baseUrlStr: string = kBCOVPlaybackServiceRequestFactoryBaseUrl) {
    this.accountId = accountId;
    this.policyKey = policyKey;
    this.baseUrlStr = baseUrlStr;
    this.requestParams = {
      headers: {
        [kBCOVPlaybackServiceRequestFactoryPolicyHeader]: this.policyKey,
      },
    };
  }

  public findVideos(parameters: object = {}): Promise<Video[]> {
    const urlStr = this.baseVideoRequestStringWithSuffix('', parameters);
    return Request.get(urlStr, this.requestParams)
      .then(this.parsePlaylist)
      .catch(this.parsePlaylist);
  }

  public findVideoWithVideoId(videoId: string, parameters: object = {}): Promise<Video[]> {
    const videoIdPathComponent = vsprintf('/%s', [videoId]);
    const urlStr = this.baseVideoRequestStringWithSuffix(videoIdPathComponent, parameters);
    return Request.get(urlStr, this.requestParams)
      .then(this.parseVideo)
      .catch(this.parseVideo);
  }

  public findVideoWithReferenceId(referenceId: string, parameters: object = {}): Promise<Video[]> {
    const videoReferenceIdPathComponent = vsprintf('%s%s', [
      kBCOVPlaybackServiceRequestFactoryResourceRefId,
      referenceId,
    ]);
    const urlStr = this.baseVideoRequestStringWithSuffix(videoReferenceIdPathComponent, parameters);
    return Request.get(urlStr, this.requestParams)
      .then(this.parseVideo)
      .catch(this.parseVideo);
  }

  public findVideosRelated(videoId: string, parameters: object = {}): Promise<Video[]> {
    const videoIdPathComponent = vsprintf('/%s%s', [videoId, kBCOVPlaybackServiceRequestFactoryResourceRelated]);
    const urlStr = this.baseVideoRequestStringWithSuffix(videoIdPathComponent, parameters);
    return Request.get(urlStr, this.requestParams)
      .then(this.parsePlaylist)
      .catch(this.parsePlaylist);
  }

  public findPlaylistWithPlaylistId(playlistId: string, parameters: object = {}): Promise<Video[]> {
    const playlistIdPathComponent = vsprintf('/%s', [playlistId]);
    const urlStr = this.basePlaylistRequestStringWithSuffix(playlistIdPathComponent, parameters);
    return Request.get(urlStr, this.requestParams)
      .then(this.parsePlaylist)
      .catch(this.parsePlaylist);
  }

  public findPlaylistWithReferenceId(referenceId: string, parameters: object = {}): Promise<Video[]> {
    const playlistReferenceIdPathComponent = vsprintf('%s%s', [
      kBCOVPlaybackServiceRequestFactoryResourceRefId,
      referenceId,
    ]);
    const urlStr = this.basePlaylistRequestStringWithSuffix(playlistReferenceIdPathComponent, parameters);

    return Request.get(urlStr, this.requestParams)
      .then(this.parsePlaylist)
      .catch(this.parsePlaylist);
  }

  private encodedRequestParameterString(parameters: object): string {
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

  private basePlaylistRequestStringWithSuffix(suffix: string, parameters: object): string {
    const { baseUrlStr, accountId } = this;
    if (parameters && Object.keys(parameters).length) {
      const encodedParameters = this.encodedRequestParameterString(parameters);
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

  private baseVideoRequestStringWithSuffix(suffix: string, parameters: object): string {
    const { baseUrlStr, accountId } = this;
    if (parameters && Object.keys(parameters).length) {
      const encodedParameters = this.encodedRequestParameterString(parameters);
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

  private parsePlaylist(playlist: any): Video[] {
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

  private parseVideo(video: any): Video[] {
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

export { BCOVPlaybackService, Video };
