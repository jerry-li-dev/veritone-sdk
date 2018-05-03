import React, { Component } from 'react';
import {
  arrayOf,
  shape,
  number,
  string,
  objectOf,
  any,
  func
} from 'prop-types';
import { get } from 'lodash';
import classNames from 'classnames';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import EngineOutputHeader from '../EngineOutputHeader';
import SDOTable from '../SDOTable';
import withMuiThemeProvider from '../../helpers/withMuiThemeProvider';
import styles from './styles.scss';

@withMuiThemeProvider
class StructuredDataEngineOutput extends Component {
  static propTypes = {
    data: arrayOf(
      shape({
        startTimeMs: number,
        stopTimeMs: number,
        sourceEngineId: string,
        sourceEngineName: string,
        taskId: string,
        series: arrayOf(
          shape({
            startTimeMs: number,
            stopTimeMs: number,
            structuredData: objectOf(any)
          })
        )
      })
    ),
    engines: arrayOf(
      shape({
        sourceEngineId: string,
        sourceEngineName: string
      })
    ),
    schemaById: objectOf(any),
    selectedEngineId: string,
    onEngineChange: func,
    className: string,
    onExpandClicked: func
  };

  static defaultProps = {
    data: []
  };

  state = {
    selectedSchemaId: null,
    flattenStructuredData: {},
    engineSchemaIds: []
  };

  componentWillMount() {
    this.processStructuredData(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.processStructuredData(nextProps.data);
    }
  }

  processStructuredData = data => {
    const flattenStructuredData = {};
    data
      .filter(jsonData => get(jsonData, 'series.length', 0))
      .forEach(jsonData => {
        jsonData.series.forEach(seriesItem => {
          const structuredData = get(seriesItem, 'structuredData');
          if (structuredData) {
            const schemaIds = Object.keys(structuredData);
            schemaIds.forEach(schemaId => {
              if (!flattenStructuredData[schemaId]) {
                flattenStructuredData[schemaId] = [];
              }
              if (Array.isArray(structuredData[schemaId])) {
                structuredData[schemaId].forEach(structuredDataItem =>
                  flattenStructuredData[schemaId].push(structuredDataItem)
                );
              } else {
                flattenStructuredData[schemaId].push(structuredData[schemaId]);
              }
            });
          }
        });
      });

    const engineSchemaIds = Object.keys(flattenStructuredData);
    let selectedSchemaId = null;
    if (engineSchemaIds.length) {
      selectedSchemaId = engineSchemaIds[0];
    }

    this.setState({
      selectedSchemaId: selectedSchemaId,
      flattenStructuredData: flattenStructuredData,
      engineSchemaIds: engineSchemaIds
    });
  };

  getSchemaName = schemaId => {
    const schema = this.props.schemaById[schemaId];
    if (get(schema, 'dataRegistry.name')) {
      return get(schema, 'dataRegistry.name');
    }
    return schemaId;
  };

  onSchemaChange = evt => {
    this.setState({
      selectedSchemaId: evt.target.value
    });
  };

  handleEngineChange = engineId => {
    if (engineId === this.props.selectedEngineId) {
      return;
    }
    this.setState({
      selectedSchemaId: null,
      flattenStructuredData: {},
      engineSchemaIds: []
    });
    this.props.onEngineChange(engineId);
  };

  render() {
    const {
      className,
      engines,
      schemaById,
      selectedEngineId,
      onExpandClicked
    } = this.props;

    const {
      selectedSchemaId,
      flattenStructuredData,
      engineSchemaIds
    } = this.state;

    return (
      <div className={classNames(styles.structuredDataOutputView, className)}>
        <EngineOutputHeader
          title="Structured Data"
          engines={engines}
          selectedEngineId={selectedEngineId}
          onEngineChange={this.handleEngineChange}
          onExpandClicked={onExpandClicked}
        >
          {schemaById[selectedSchemaId] && (
            <Select
              value={selectedSchemaId}
              className={styles.schemaMenu}
              onChange={this.onSchemaChange}
              MenuProps={{
                anchorOrigin: {
                  horizontal: 'center',
                  vertical: 'bottom'
                },
                transformOrigin: {
                  horizontal: 'center'
                },
                getContentAnchorEl: null
              }}
            >
              {engineSchemaIds.map(schemaId => {
                return (
                  <MenuItem
                    key={'structured-data-schema-menu-item-' + schemaId}
                    value={schemaId}
                    className={styles.schemaMenuItem}
                  >
                    {this.getSchemaName(schemaId)}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        </EngineOutputHeader>
        {schemaById[selectedSchemaId] &&
          flattenStructuredData[selectedSchemaId] && (
            <SDOTable
              data={flattenStructuredData[selectedSchemaId]}
              schema={schemaById[selectedSchemaId].definition.properties}
            />
          )}
      </div>
    );
  }
}

export default StructuredDataEngineOutput;