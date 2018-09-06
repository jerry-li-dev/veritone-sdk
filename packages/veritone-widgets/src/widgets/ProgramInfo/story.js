import React from 'react';
import { storiesOf } from '@storybook/react';

import VeritoneApp from '../../shared/VeritoneApp';
import ProgramInfoWidget from '.';

const generateAcls = function(n, permission) {
  const acls = [];
  for (let i = 1; i <= n; i++) {
    acls.push({
      organizationId: 'orgId' + i,
      permission: permission
    });
  }
  return acls;
};

const generateOrganizations = function(n) {
  const organizations = [];
  for (let i = 1; i <= n; i++) {
    organizations.push({
      id: 'orgId' + i,
      name: 'Organization ' + i
    });
  }
  return organizations;
};

const generateAffiliates = function(n, setSchedule) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    const affiliate = {
      id: String(i),
      name: 'Affiliate Station ' + i
    };
    if (setSchedule) {
      affiliate.schedule = {
        scheduleType: 'Recurring',
        start: '2018-04-14T19:48:25.147Z',
        end: '2018-04-17T19:48:25.147Z',
        repeatEvery: {
          number: '1',
          period: 'week'
        },
        weekly: {
          Wednesday: [
            {
              start: '16:33',
              end: '17:21'
            }
          ],
          Thursday: [
            {
              start: '12:33',
              end: '03:21'
            },
            {
              start: '01:00',
              end: '01:00'
            }
          ],
          selectedDays: {
            Wednesday: true,
            Thursday: true
          }
        }
      };
    }
    result.push(affiliate);
  }
  return result;
};

const AFFILIATES_LIST = generateAffiliates(222);

const loadNextAffiliates = function ({limit, offset, nameSearchText = ''}) {
  return Promise.resolve(
    slice(AFFILIATES_LIST
      .filter(affiliate => affiliate.name.toLowerCase().includes(nameSearchText.toLowerCase())), offset, offset + limit));
};

class NoDataStory extends React.Component {
  state = { lastResult: {} };

  componentDidMount() {
    this._programInfo = new ProgramInfoWidget({
      elId: 'programInfo-widget',
      programFormats: ['live', 'recorded']
    });
  }

  componentWillUnmount() {
    this._programInfo.destroy();
  }

  handleSubmit = values => {
    this.setState({
      lastResult: values
    });
  };

  submitForm = () => {
    this._programInfo.submit(values => {
      this.handleSubmit(values);
      console.log('Form Submitted:', values);
    });
  };

  render() {
    return (
      <div>
        <span id="programInfo-widget" />
        <button type="button" onClick={this.submitForm}>
          Submit
        </button>
        <div>
          Last result:
          <pre>{JSON.stringify(this.state.lastResult, null, '\t')}</pre>
        </div>
      </div>
    );
  }
}

class FullDataStory extends React.Component {
  state = { lastResult: {} };

  componentDidMount() {
    this._programInfo = new ProgramInfoWidget({
      elId: 'programInfo-widget',
      canShare: true,
      canEditAffiliates: true,
      canBulkAddAffiliates: true,
      program: {
        id: '12345',
        name: 'Test program',
        programImage: '',
        programLiveImage: '',
        description: 'This is a test program data with description',
        website: 'www.veritone.com',
        format: 'live',
        language: 'en',
        isNational: true,
        acls: generateAcls(11, 'viewer'),
        isPublic: false,
        affiliates: generateAffiliates(11, true)
      },
      programFormats: ['live', 'recorded'],
      organizations: generateOrganizations(21),
      loadNextAffiliates: loadNextAffiliates
    });
  }

  componentWillUnmount() {
    this._programInfo.destroy();
  }

  handleSubmit = values => {
    this.setState({
      lastResult: values
    });
  };

  submitForm = () => {
    this._programInfo.submit(values => {
      this.handleSubmit(values);
      console.log('Form Submitted:', values);
    });
  };

  render() {
    return (
      <div>
        <span id="programInfo-widget" />
        <button type="button" onClick={this.submitForm}>
          Submit
        </button>
        <div>
          Last result:
          <pre>{JSON.stringify(this.state.lastResult, null, '\t')}</pre>
        </div>
      </div>
    );
  }
}

const app = VeritoneApp();

storiesOf('Program Info', module)
  .add('Base No Data', () => {
    return <NoDataStory store={app._store} />;
  })

  .add('Base Full Data', () => {
    return <FullDataStory store={app._store} />;
  });
