import React from 'react';
import { get } from 'lodash';
import { objectOf, any, func } from 'prop-types';
import { ContentTemplate } from 'veritone-react-common';

import widget from '../../shared/widget';

class ContentTemplateWidget extends React.Component {
  static propTypes = {
    templateData: objectOf(any).isRequired,
    initialTemplates: objectOf(any),
    handleUpdateContentTemplates: func.isRequired
  };

  static defaultProps = {
    initialTemplates: {}
  };

  state = {
    contentTemplates: {}
  };

  // eslint-disable-next-line react/sort-comp
  UNSAFE_componentWillMount() {
    const newState = {
      contentTemplates: { ...this.props.initialTemplates }
    };

    this.setState(newState);
  }

  onListChange = (templateSchemaId, remove = false) => {
    const { templateData, initialTemplates } = this.props;
    let newState;
    if (remove) {
      if (this.state.contentTemplates[templateSchemaId]) {
        const contentTemplates = { ...this.state.contentTemplates };
        delete contentTemplates[templateSchemaId];
        newState = { contentTemplates };
        this.setState(newState);
      }
    } else {
      const data = {};
      Object.keys(templateData[templateSchemaId].definition.properties).reduce(
        (fields, schemaDefProp) => {
          let value = get(initialTemplates, [
            templateSchemaId,
            'data',
            schemaDefProp
          ]);
          if (value) {
            data[schemaDefProp] = value;
          }
        },
        data
      );
      newState = {
        contentTemplates: {
          ...this.state.contentTemplates,
          [templateSchemaId]: {
            ...templateData[templateSchemaId],
            data
          }
        }
      };
      this.setState(newState);
    }
    if (newState) {
      this.props.handleUpdateContentTemplates(newState.contentTemplates);
    }
  };

  onInputChange = (templateSchemaId, fieldId, value) => {
    const { contentTemplates } = this.state;
    let newState = {
      contentTemplates: {
        ...contentTemplates,
        [templateSchemaId]: {
          ...contentTemplates[templateSchemaId],
          data: {
            ...contentTemplates[templateSchemaId].data
          }
        }
      }
    };
    if (value) {
      newState.contentTemplates[templateSchemaId].data[fieldId] = value;
    } else {
      delete newState.contentTemplates[templateSchemaId].data[fieldId];
    }
    this.setState(newState);
    this.props.handleUpdateContentTemplates(newState.contentTemplates);
  };

  render() {
    return (
      <ContentTemplate
        templateData={this.props.templateData}
        selectedTemplateSchemas={this.state.contentTemplates}
        handleUpdateContentTemplates={this.props.handleUpdateContentTemplates}
        onListChange={this.onListChange}
        onInputChange={this.onInputChange}
      />
    );
  }
}

export default widget(ContentTemplateWidget);