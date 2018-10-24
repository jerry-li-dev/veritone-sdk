import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import VeritoneApp from '../../shared/VeritoneApp';
import ContentTemplateFormWidget from './';
import { has, cloneDeep } from 'lodash';

// CONTENT TEMPLATES SETUP
const source = {
  data: {
    source: {
      id: '666',
      name: 'KWOL--FM',
      contentTemplates: [
        {
          schemaId: 'schemaGuid1',
          data: {
            url: 'twitter.com',
            username: 'THEREALTRUMP'
          }
        }
      ]
    }
  }
};

//// FORM CARDS LIST SETUP
const result = {
  data: {
    dataRegistries: {
      records: [
        {
          name: 'Twitter Schema',
          schemas: {
            records: [
              {
                id: 'schemaGuid1',
                status: 'published',
                definition: {
                  properties: {
                    url: {
                      type: 'string',
                      title: 'URL'
                    },
                    username: {
                      type: 'string'
                    }
                  }
                }
              },
              {
                id: 'schemaGuid2',
                status: 'published',
                // dataRegistry: {
                //   name: 'Twitter Schema 2'
                // },
                definition: {
                  properties: {
                    url: {
                      type: 'string'
                    },
                    username: {
                      type: 'string'
                    },
                    password: {
                      type: 'string'
                    }
                  }
                }
              },
              {
                id: 'schemaGuid2',
                status: 'published',
                // dataRegistry: {
                //   name: 'Twitter Schema'
                // },
                definition: {
                  test: 'citest'
                }
              },
              {
                id: 'schemaGuid2',
                status: 'draft',
                // dataRegistry: {
                //   name: 'Twitter Schema'
                // },
                definition: {
                  properties: {
                    url: {
                      type: 'string'
                    },
                    username: {
                      type: 'string'
                    }
                  }
                }
              }
            ]
          }
        }
      ]
    }
  }
};

function createTemplateData(dataSchemas) {
  const templateSchemas = {};
  // array of data registries containing an array of schemas
  dataSchemas.reduce((schemaStore, registryData) => {
    registryData.schemas.records.forEach(schema => {
      // only take schemas that are 'published' and also define field types
      if (
        schema.status === 'published' &&
        has(schema.definition, 'properties')
      ) {
        schemaStore[schema.id] = {
          name: registryData.name,
          ...schema
        };
      }
    });
  }, templateSchemas);

  return templateSchemas;
}

function createInitialTemplates(templateSources) {
  const selectedTemplateSchemas = [];

  const templateSchemas = createTemplateData(
    result.data.dataRegistries.records
  );
  templateSources.forEach(template => {
    if (has(templateSchemas, template.schemaId)) {
      const selectedTemplate = cloneDeep(templateSchemas[template.schemaId]);
      if (template.data) {
        // if we need to fill out the form with pre-data
        selectedTemplate.data = template.data;
      }
      selectedTemplateSchemas.push(selectedTemplate);
    }
  });

  return selectedTemplateSchemas;
}

const templateData = createTemplateData(result.data.dataRegistries.records);
const initialTemplates = createInitialTemplates(
  source.data.source.contentTemplates
);

class Story extends React.Component {
  componentDidMount() {
    this._ctFormWidget = new ContentTemplateFormWidget({
      elId: 'ct-form-widget',
      title: 'Content Template Form Widget',
      templateData,
      initialTemplates,
      onSubmit: function(data) {
        console.log('data:', data);
      },
      textInputMaxRows: 5
    });
  }

  componentWillUnmount() {
    this._ctFormWidget.destroy();
  }

  render() {
    return (
      <div>
        <span id="ct-form-widget" />
      </div>
    );
  }
}

const app = VeritoneApp();

storiesOf('Content Template Form', module).add('Form', () => {
  const sessionToken = text('Api Session Token', '');

  return <Story sessionToken={sessionToken} store={app._store} />;
});
