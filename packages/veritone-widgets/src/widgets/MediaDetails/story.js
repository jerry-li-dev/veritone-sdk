import React from 'react';
import { storiesOf } from '@storybook/react';

import VeritoneApp from '../../shared/VeritoneApp';
import MediaDetailsPage from './';

class Story extends React.Component {
  componentDidMount() {
    this._mediaDetailsPage = new MediaDetailsPage({
      elId: 'mediaDetails-widget',
      mediaId: 400001923,
      onClose: function() {
        console.log('Widget for Media Details onClose clicked.');
      }
    });
  }

  componentWillUnmount() {
    this._mediaDetailsPage.destroy();
  }

  render() {
    return (
      <div>
        <span id="mediaDetails-widget" />
      </div>
    );
  }
}

const app = VeritoneApp();

storiesOf('MediaDetailsPage', module).add('Base', () => {
  return <Story store={app._store} />;
});