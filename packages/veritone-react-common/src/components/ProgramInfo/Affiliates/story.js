import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { slice } from 'lodash';

import Affiliates from './';

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

storiesOf('Affiliates', module)
  .add('Base', () => (
    <Affiliates
      loadNextAffiliates={loadNextAffiliates}
      selectedAffiliates={generateAffiliates(11, true)}
      onAffiliateChange={action('onAffiliateChange')}
      canBulkAddAffiliates
    />
  ))
  .add('No Initial Affiliates', () => (
    <Affiliates
      loadNextAffiliates={loadNextAffiliates}
      onAffiliateChange={action('onAffiliateChange')}
      canBulkAddAffiliates
    />
  ));
