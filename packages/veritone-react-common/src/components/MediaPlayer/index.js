import React from 'react';
import { get, noop } from 'lodash';
import {
  arrayOf,
  shape,
  string,
  number,
  bool,
  func,
  objectOf,
  any,
  object,
  oneOfType
} from 'prop-types';
import {
  Player,
  ControlBar,
  BigPlayButton,
  VolumeMenuButton,
  ReplayControl,
  ForwardControl,
  PlayToggle,
  CurrentTimeDisplay,
  TimeDivider,
  DurationDisplay,
  ProgressControl,
  FullscreenToggle
} from 'video-react';
import cx from 'classnames';

import RestartMediaButton from './RestartMediaButton';
import BoundingPolyOverlay from './../BoundingPolyOverlay/Overlay';
import OverlayPositioningProvider from './../BoundingPolyOverlay/OverlayPositioningProvider';

import VideoSource from './VideoSource';
import { getPolysForTime } from './helpers';

import styles from './styles.scss';

export default class MediaPlayerComponent extends React.Component {
  static propTypes = {
    src: string,
    streams: arrayOf(
      shape({
        protocol: string,
        uri: string
      })
    ),
    overlayContentClassName: string,
    reactPlayerClassName: string,
    boundingPolySeries: arrayOf(
      shape({
        startTimeMs: number.isRequired,
        stopTimeMs: number.isRequired,
        object: shape({
          id: string.isRequired,
          overlayObjectType: string,
          boundingPoly: arrayOf(
            shape({ x: number.isRequired, y: number.isRequired })
          ).isRequired
        })
      })
    ),
    onAddBoundingBox: func,
    onDeleteBoundingBox: func,
    onChangeBoundingBox: func,
    onPlayerRefReady: func,

    defaultBoundingBoxStyles: objectOf(any),
    stagedBoundingBoxStyles: objectOf(any),
    stylesByObjectType: objectOf(objectOf(any)),

    actionMenuItems: arrayOf(
      shape({
        label: string.isRequired,
        onClick: func.isRequired
      })
    ),
    readOnly: bool,
    addOnly: bool,
    autoCommit: bool,
    width: oneOfType([string, number]),
    height: oneOfType([string, number]),
    // fluid = 100% width by default, see video-react docs
    fluid: bool,
    videoHeight: number,
    videoWidth: number,
    hasStarted: bool,
    isActive: bool,
    paused: bool,
    currentTime: number,
    autofocus: bool,
    forwardedRef: objectOf(any),
    useOverlayControlBar: bool
  };

  static contextTypes = {
    // need to pass our app's redux store to the Player, or else it will create
    // its own internal store that we can't integrate with
    store: object
  };

  static defaultProps = {
    fluid: true,
    onAddBoundingBox: noop,
    onDeleteBoundingBox: noop,
    onChangeBoundingBox: noop,
    useOverlayControlBar: false
  };

  componentDidMount() {
    if (this.props.onPlayerRefReady) {
      const playerRef = get(this.props.forwardedRef, 'current');
      if (playerRef) {
        this.props.onPlayerRefReady(playerRef);
      }
    }
  }

  handleAddBoundingBox = newBox => {
    this.props.onAddBoundingBox(newBox, this.props.currentTime * 1000);
  };

  render() {
    const {
      src,
      streams,
      overlayContentClassName,
      reactPlayerClassName,
      useOverlayControlBar,
      ...props
    } = this.props;

    const currentPolys = getPolysForTime(
      this.props.boundingPolySeries || [],
      this.props.currentTime * 1000
    );

    return (
      <OverlayPositioningProvider
        contentHeight={this.props.videoHeight}
        contentWidth={this.props.videoWidth}
        fixedWidth={!props.fluid}
        contentClassName={overlayContentClassName}
      >
        {this.props.hasStarted && (
          <BoundingPolyOverlay
            wrapperStyles={{ zIndex: 100 }}
            onAddBoundingBox={this.handleAddBoundingBox}
            onDeleteBoundingBox={this.props.onDeleteBoundingBox}
            onChangeBoundingBox={this.props.onChangeBoundingBox}
            initialBoundingBoxPolys={
              this.props.boundingPolySeries ? currentPolys : undefined
            }
            actionMenuItems={this.props.actionMenuItems}
            addOnly={this.props.addOnly}
            readOnly={this.props.readOnly || !this.props.paused}
            autoCommit={this.props.autoCommit}
            stagedBoundingBoxStyles={props.stagedBoundingBoxStyles}
            stylesByObjectType={props.stylesByObjectType}
            defaultBoundingBoxStyles={props.defaultBoundingBoxStyles}
            autofocus={props.autofocus}
          />
        )}
        <Player
          className={styles.mediaPlayer + ' ' + reactPlayerClassName}
          ref={this.props.forwardedRef}
          store={this.context.store}
          {...props}
        >
          {/* prevent video-react from adding its own control bar */}
          <ControlBar
            className={
              cx('video-react', styles.mediaPlayerControls)
            }
            style={{ position: 'static' }}
            autoHide
            disableDefaultControls
            disableCompletely={!useOverlayControlBar}
            >
            <RestartMediaButton order={1.1} />
            <ReplayControl seconds={10} order={1.2} />
            <ForwardControl seconds={10} order={1.3} />
            <PlayToggle order={2} />
            <CurrentTimeDisplay order={3.1} />
            <TimeDivider order={3.2} />
            <DurationDisplay order={3.3} />
            <ProgressControl order={6} />
            <VolumeMenuButton vertical order={7} />
            <FullscreenToggle order={8} />
          </ControlBar>
          <VideoSource isVideoChild src={src} streams={streams} />
          <BigPlayButton position="center" className={styles.mediaPlayButton} />
        </Player>
      </OverlayPositioningProvider>
    );
  }
}