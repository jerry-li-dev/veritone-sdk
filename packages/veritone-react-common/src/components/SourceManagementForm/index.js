import React from 'react';
import { arrayOf, objectOf, any, func, string, shape, bool } from 'prop-types';
import { pick, has, get, noop, reject, cloneDeep, isUndefined } from 'lodash';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import FullScreenDialog from 'components/FullScreenDialog';
import ModalHeader from 'components/ModalHeader';
import SourceConfiguration from 'components/SourceConfiguration';
import ContentTemplates from 'components/ContentTemplates';
import SharingConfiguration from 'components/SharingConfiguration';
import { guid } from 'helpers/guid';

import styles from './styles.scss';

export default class SourceManagementForm extends React.Component {
  static propTypes = {
    sourceTypes: arrayOf(
      shape({
        id: string.isRequired,
        name: string.isRequired,
        sourceSchema: shape({
          definition: shape({
            properties: shape({
              type: string
            })
          })
        })
      })
    ).isRequired,
    templateData: objectOf(
      shape({
        id: string,
        name: string.isRequired,
        status: string,
        definition: objectOf(any)
      })
    ).isRequired,
    source: shape({
      name: string,
      sourceType: objectOf(any),
      details: objectOf(any),
      thumbnailUrl: string
    }),
    initialTemplates: arrayOf(
      shape({
        id: string,
        name: string.isRequired,
        status: string,
        definition: objectOf(any),
        data: objectOf(any)
      })
    ),
    canShare: bool,
    organizations: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired
    })),
    onSubmit: func.isRequired,
    onClose: func,
    getFieldOptions: func.isRequired,
    open: bool
  };

  static defaultProps = {
    initialTemplates: [],
    onClose: noop
  };

  state = {
    selectedSource: null,
    sourceConfig: {
      sourceTypeId: '',
      name: '',
      thumbnailUrl: '',
      details: {},
      thumbnailFile: null
    },
    formDirtyStates: {},
    contentTemplates: [],
    activeTab: 0,
    openDialog: true
  };

  // eslint-disable-next-line react/sort-comp
  UNSAFE_componentWillMount() {
    const { sourceTypes } = this.props;

    const newState = {
      contentTemplates: [...this.props.initialTemplates]
    };
    newState.contentTemplates.forEach(template => (template.guid = guid()));

    if (has(this.props, 'open')) {
      newState.openDialog = this.props.open;
    }
    if (this.props.source) {
      // if editing a source, initialize the defaults
      newState.sourceConfig = {
        ...pick(this.props.source, ['name', 'thumbnailUrl', 'details']),
        sourceTypeId: this.props.source.sourceType.id
      };
      if (this.props.canShare) {
        newState.share = {
          isPublic: this.props.source.isPublic,
          acls: get(this.props.source, 'collaborators.records') || []
        }
      }
    } else {
      // If there is no source, then just pick the first available sourceType
      const fieldValues = {};
      const sourceTypeIdx = 0;
      const properties = get(sourceTypes, [
        sourceTypeIdx,
        'sourceSchema',
        'definition',
        'properties'
      ]);

      if (properties) {
        Object.keys(properties).forEach(field => {
          fieldValues[field] = '';
        });
      }

      newState.sourceConfig = {
        ...this.state.sourceConfig,
        sourceTypeId: sourceTypes[sourceTypeIdx].id,
        details: {
          ...fieldValues
        }
      };
      if (this.props.canShare) {
        newState.share = {
          isPublic: false,
          acls: []
        };
      }
    }

    return this.setState(newState);
  }

  handleCloseDialog = () => {
    return this.setState({ openDialog: false }, () => {
      this.props.onClose();
    });
  };

  handleChangeTab = (e, tabIdx) => {
    return this.setState({ activeTab: tabIdx });
  };

  saveConfiguration = config => {
    return this.setState(prevState => ({
      sourceConfig: {
        ...prevState.sourceConfig,
        ...config
      }
    }));
  };

  addToTemplateList = templateSchemaId => {
    const { templateData } = this.props;
    const data = {};
    Object.keys(templateData[templateSchemaId].definition.properties).reduce(
      (fields, schemaDefProp) => {
        data[schemaDefProp] = data[schemaDefProp];
      },
      data
    );
    this.setState(prevState => ({
      contentTemplates: [
        {
          ...templateData[templateSchemaId],
          data,
          guid: guid()
        },
        ...prevState.contentTemplates
      ]
    }));
  };

  removeFromTemplateList = templateId => {
    return this.setState(prevState => {
      return {
        contentTemplates: reject([...prevState.contentTemplates], {
          guid: templateId
        })
      };
    });
  };

  updateTemplateDetails = (templateId, fieldId, value) => {
    this.setState(prevState => {
      if (
        prevState.contentTemplates.some(
          template => template.guid === templateId
        )
      ) {
        const contentTemplates = [...prevState.contentTemplates];
        const templateIndex = contentTemplates.findIndex(
          template => template.guid === templateId
        );
        contentTemplates[templateIndex] = {
          ...contentTemplates[templateIndex],
          data: {
            ...contentTemplates[templateIndex].data,
            [fieldId]: value
          }
        };
        return { contentTemplates };
      }
    });
  };

  handleAclsChange = acls => {
    this.setState(prevState => {
      return {
        share: {
          ...prevState.share,
          acls
        }
      };
    });
  };

  handleIsPublicChange = isPublic => {
    this.setState(prevState => {
      return {
        share: {
          ...prevState.share,
          isPublic
        }
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const sourceTypeId = this.state.sourceConfig.sourceTypeId;
    const selectedSourceType = this.props.sourceTypes.find(sourceType => sourceType.id === sourceTypeId);
    const schemaProps = get(selectedSourceType, 'sourceSchema.definition.properties');
    const formDirtyStates = Object.keys(schemaProps || []).reduce((acc, curVal) => {
      acc[curVal] = true;
      return acc;
    }, {});
    // Determine if any required fields are undefined and prevent submission if invalid
    const formValues = this.state.sourceConfig.details;
    const requiredFields = get(selectedSourceType, 'sourceSchema.definition.required') || [];
    let isValidForm = true;
    requiredFields.forEach(requiredField => {
      const value = formValues[requiredField];
      if (isUndefined(value) || value === '') {
        isValidForm = false;
      }
    });
    this.setState({ formDirtyStates }, () => {
      if (isValidForm) {
        const resultTemplates = cloneDeep(this.state.contentTemplates);
        resultTemplates.forEach(template => delete template.guid);
        this.props.onSubmit({
          sourceConfiguration: this.state.sourceConfig,
          contentTemplates: resultTemplates,
          share: this.state.share
        });
      }
    });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <FullScreenDialog open={this.state.openDialog}>
        <div className={styles['sm-form-wrapper']}>
          <ModalHeader
            title={this.state.sourceConfig.name || 'New Source'}
            icons={[
              <IconButton aria-label="exit" key="icon-3">
                <Icon
                  className="icon-close-exit"
                  onClick={this.handleCloseDialog}
                />
              </IconButton>
            ]}
          >
            <Tabs
              classes={{ indicator: styles['tab-indicator'] }}
              value={activeTab}
              onChange={this.handleChangeTab}
            >
              <Tab
                label="Configuration"
                classes={{ label: styles['form-tab'] }}
              />
              <Tab
                label="Content Templates"
                classes={{ label: styles['form-tab'] }}
              />
              {
                this.props.canShare ?
                (
                  <Tab
                    label="Sharing"
                    classes={{ label: styles['form-tab'] }}
                  />
                ) : null
              }
            </Tabs>
          </ModalHeader>
          <form onSubmit={this.handleSubmit} className={styles['form-scroll']}>
            {activeTab === 0 && (
              <SourceConfiguration
                sourceTypes={this.props.sourceTypes}
                source={this.state.sourceConfig}
                onInputChange={this.saveConfiguration}
                getFieldOptions={this.props.getFieldOptions}
                errorFields={this.state.formDirtyStates}
                onClose={this.handleCloseDialog}
              />
            )}
            {activeTab === 1 && (
              <ContentTemplates
                templateData={this.props.templateData}
                selectedTemplateSchemas={this.state.contentTemplates}
                onAddTemplate={this.addToTemplateList}
                onRemoveTemplate={this.removeFromTemplateList}
                onInputChange={this.updateTemplateDetails}
                getFieldOptions={this.props.getFieldOptions}
              />
            )}
            {activeTab === 2 && (
              <div className={styles.shareContainer}>
                <SharingConfiguration
                  acls={this.state.share.acls}
                  organizations={this.props.organizations}
                  isPublic={this.state.share.isPublic}
                  defaultPermission="viewer"
                  onAclsChange={this.handleAclsChange}
                  showMakePublic
                  onIsPublicChange={this.handleIsPublicChange}
                  sharingSectionDescription="Share this source across organizations."
                  aclGroupsSectionDescription="Grant organizations permission to this source and its contents."
                  publicSectionDescription="Share this source and all of its content with all of Veritone."
                />
              </div>
            )}
            <div className={styles['btn-container']}>
              <Button onClick={this.handleCloseDialog}>Cancel</Button>
              <Button variant="raised" color="primary" type="submit">
                {get(this.props, 'source.id') ? 'Save' : 'Create'}
              </Button>
            </div>
          </form>
        </div>
      </FullScreenDialog>
    );
  }
}
