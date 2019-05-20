import React from 'react';
import Work from '@material-ui/icons/Work';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Breadcrumbs from './';

storiesOf('Breadcrumbs', module)
  .add('Full path list', () => {
    const pathList = [
      { id: 'root', icon: <Work /> },
      { id: 'first', label: 'Parent' },
      { id: 'second', label: 'Child' },
      { id: 'third', label: 'GrandChild' }
    ]
    return (
      <Breadcrumbs
        pathList={pathList}
        onCrumbClick={action('onCrumbClick')}
      />
    );
  })
  .add('Hidden path list', () => {
    const pathList = [
      { id: 'root', icon: <Work /> },
      { id: 'first', label: 'Parent' },
      { id: 'second', label: 'Child' },
      { id: 'third', label: 'GrandChild' },
      { id: 'forth', label: 'GrandGrandChild' }
    ]
    return (
      <Breadcrumbs
        pathList={pathList}
        onCrumbClick={action('onCrumbClick')}
      />
    );
  })