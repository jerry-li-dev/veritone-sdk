import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import MediaPlayer from './MediaPlayer';
import video from './';

const multipleStreams = [
  {
    protocol: 'dash',
    uri:
      'http://yt-dash-mse-test.commondatastorage.googleapis.com/media/car-20120827-manifest.mpd'
  },
  {
    protocol: 'hls',
    uri:
      'http://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8'
  }
];
const hlsStream = [
  {
    protocol: 'hls',
    uri:
      'http://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8'
  }
];
const dashStream = [
  {
    protocol: 'dash',
    uri:
      'http://yt-dash-mse-test.commondatastorage.googleapis.com/media/car-20120827-manifest.mpd'
  }
];
const demoMp4 = 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4';
const alternateDemoMp4 =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
const demoMp3 = 'https://www.sample-videos.com/audio/mp3/wave.mp3';
const demoPosterImage =
  '//static.veritone.com/veritone-ui/default-nullstate.svg';

storiesOf('Video', module).add('Base', () => (
  <video.Player autoPlay src={demoMp4} />
));

storiesOf('Video', module).add('MP4', () => (
  <MediaPlayer streams={multipleStreams} width={500} fluid={false} />
));

storiesOf('Video', module).add('DASH', () => (
  <MediaPlayer autoPlay streams={dashStream} width={500} fluid={false} />
));

storiesOf('Video', module).add('HLS', () => (
  <MediaPlayer autoPlay streams={hlsStream} width={500} fluid={false} />
));

storiesOf('Video', module).add('Multiple Streams', () => (
  <MediaPlayer autoPlay streams={multipleStreams} width={500} fluid={false} />
));

storiesOf('Video', module).add('Switch Source', () => {
  const label = 'Video Sources';
  const options = [demoMp4, alternateDemoMp4];
  const value = select(label, options, options[0]);

  return <MediaPlayer src={value} width={500} fluid={false} />;
});

storiesOf('Video', module).add('Audio only', () => (
  <MediaPlayer
    src={demoMp3}
    width={500}
    fluid={false}
    poster={demoPosterImage}
  />
));