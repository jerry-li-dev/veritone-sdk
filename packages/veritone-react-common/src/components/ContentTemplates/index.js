import React from 'react';
import {
  string,
  shape,
  arrayOf,
  objectOf,
  any,
  func,
  bool,
  number
} from 'prop-types';

import TemplateForms from './TemplateForms';
import TemplateList from './TemplateList';
import ContentTemplatesNullState from './NullState';
import styles from './styles.scss';

export default class ContentTemplates extends React.Component {
  static propTypes = {
    templateData: objectOf(
      shape({
        id: string,
        name: string.isRequired,
        status: string,
        definition: objectOf(any)
      })
    ).isRequired,
    selectedTemplateSchemas: arrayOf(
      shape({
        id: string,
        guid: string,
        name: string.isRequired,
        status: string,
        definition: objectOf(any),
        data: objectOf(any),
        dirtyState: objectOf(any)
      })
    ),
    onAddTemplate: func.isRequired,
    onRemoveTemplate: func.isRequired,
    onInputChange: func.isRequired,
    getFieldOptions: func,
    isReadOnly: bool,
    textInputMaxRows: number
  };
  static defaultProps = {
    selectedTemplateSchemas: []
  };

  render() {
    const { selectedTemplateSchemas } = this.props;
    const showNullstate = !selectedTemplateSchemas.length;

    return (
      <div
        className={styles.templatePage}
        data-veritone-component="content-template-page"
      >
        <div
          className={styles['template-list-container']}
          data-veritone-component="template-list-container"
        >
          <TemplateList
            templates={this.props.templateData}
            addTemplate={this.props.onAddTemplate}
            isReadOnly={this.props.isReadOnly}
          />
        </div>
        <div
          className={styles['content-templates']}
          data-veritone-component="content-template-container"
        >
          {showNullstate ? (
            <ContentTemplatesNullState />
          ) : (
            <TemplateForms
              templates={selectedTemplateSchemas}
              onRemoveTemplate={this.props.onRemoveTemplate}
              onTemplateDetailsChange={this.props.onInputChange}
              getFieldOptions={this.props.getFieldOptions}
              isReadOnly={this.props.isReadOnly}
              textInputMaxRows={this.props.textInputMaxRows}
            />
          )}
        </div>
      </div>
    );
  }
}
