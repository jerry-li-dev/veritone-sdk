import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { util } from 'veritone-redux-common';

import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { pick, head, debounce } from 'lodash';
import {
  shape,
  number,
  string,
  bool,
  arrayOf,
  func,
  objectOf,
  oneOfType
} from 'prop-types';

import {
  FaceEngineOutput
} from 'veritone-react-common';

import * as faceEngineOutput from '../../redux/modules/mediaDetails/faceEngineOutput';
import rootSaga from '../../redux/modules/mediaDetails/faceEngineOutput/saga';

const saga = util.reactReduxSaga.saga;

@saga(rootSaga)
@connect(
  (state, { selectedEngineId }) => ({
    faces: faceEngineOutput.getFaces(state, selectedEngineId),
    entities: faceEngineOutput.getEntities(state),
    libraries: faceEngineOutput.getLibraries(state),
    entitySearchResults: faceEngineOutput.getEntitySearchResults(state),
    isFetchingEngineResults: faceEngineOutput.isFetchingEngineResults(state),
    isFetchingLibraryEntities: faceEngineOutput.isFetchingEntities(state),
    isFetchingLibraries: faceEngineOutput.isFetchingLibraries(state),
    isSearchingEntities: faceEngineOutput.isSearchingEntities(state)
  }),
  {
    fetchEngineResults: faceEngineOutput.fetchEngineResults,
    fetchLibraries: faceEngineOutput.fetchLibraries,
    createEntity: faceEngineOutput.createEntity,
    updateEngineResultEntity: faceEngineOutput.updateEngineResultEntity,
    fetchEntitySearchResults: faceEngineOutput.fetchEntitySearchResults,
    updateEngineResult: faceEngineOutput.updateEngineResult
  },
  null,
  { withRef: true }
)
class FaceEngineOutputContainer extends Component {
  static propTypes = {
    tdo: shape({
      id: string,
      details: shape({
        veritoneProgram: shape({
          programId: string,
          programName: string,
          programImage: string,
          programLiveImage: string,
          signedProgramLiveImage: string
        })
      }),
      startDateTime: string,
      stopDateTime: string,
      security: shape({
        global: bool
      })
    }).isRequired,
    engines: arrayOf(
      shape({
        id: string.isRequired,
        name: string.isRequired
      })
    ).isRequired,
    selectedEngineId: string,
    faces: shape({
      // recognizedFaces: arrayOf(
      recognizedFaces: shape({
          startTimeMs: number,
          stopTimeMs: number,
          object: shape({
            label: string,
            uri: string,
            entityId: string,
            libraryId: string,
          })
        }),
      // ),
      unrecognizedFaces: arrayOf(
        shape({
          startTimeMs: number.isRequired,
          stopTimeMs: number.isRequired,
          object: shape({
            label: string,
            uri: string
          })
        })
      )
    }),
    entities: arrayOf(
      shape({
        id: string.isRequired,
        name: string.isRequired,
        libraryId: string.isRequired,
        library: shape({
          id: string,
          name: string
        }),
        profileImageUrl: string,
        jsondata: objectOf(oneOfType([string, number]))
      })
    ),
    entitySearchResults: arrayOf(
      shape({
        name: string.isRequired,
        library: shape({
          id: string,
          name: string.isRequired
        }),
        profileImageUrl: string
      })
    ),
    libraries: arrayOf(
      shape({
        id: string,
        name: string
      })
    ),
    onEngineChange: func,
    editMode: bool,
    currentMediaPlayerTime: number,
    className: string,
    onFaceOccurrenceClicked: func,
    onRemoveFaceDetection: func,
    onEditFaceDetection: func,
    onSearchForEntities: func,
    onExpandClicked: func,
    fetchLibraries: func,
    isFetchingEngineResults: bool,
    isFetchingEntities: bool,
    isFetchingLibraries: bool,
    isSearchingEntities: bool,
    allowEdit: func,
    fetchEngineResults: func,
    fetchEntitySearchResults: func,
    updateEngineResultEntity: func,
    createEntity: func
  };

  state = {
    currentlyEditedFace: null, // selected unrecognized face object from which to create a new 'entity'
    dialogOpen: false,
    newEntity: {
      libraryId: '',
      name: ''
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isFetchingEngineResults, isFetchingEntities, faces, editMode, allowEdit } = nextProps;

    if (!this.props.libraries.length && nextProps.libraries.length) {
      this.setNewEntityLibrary(head(nextProps.libraries).id)
    }

    if (allowEdit && !editMode && !isFetchingEngineResults && !isFetchingEntities) {
      allowEdit(!faces.unrecognizedFaces.length)
    }

    if (nextProps.selectedEngineId !== this.props.selectedEngineId) {
      this.props.fetchEngineResults({
        selectedEngineId: nextProps.selectedEngineId,
        tdo: this.props.tdo
      });
    }

  }

  handleSearchEntities = (searchText) => {
    this.props.fetchEntitySearchResults('people', searchText);
  }

  handleFaceDetectionEntitySelect = (currentlyEditedFace, selectedEntity)  => {
    this.props.updateEngineResultEntity(
      this.props.selectedEngineId,
      currentlyEditedFace,
      selectedEntity
    )
  }

  handleAddNewEntity = (currentlyEditedFace) => {
    if (!this.props.libraries.length) {
      this.props.fetchLibraries({
        libraryType: 'people'
      });
    }

    this.openDialog();
    this.setState({
      currentlyEditedFace
    })
  }

  handleNewEntityLibraryChange = (e) => {
    this.setNewEntityLibrary(e.target.value);
  }

  setNewEntityLibrary = (libraryId) => {
    this.setState(prevState => ({
      newEntity: {
        ...prevState.newEntity,
        libraryId
      }
    }));
  }

  setNewEntityName = (e) => {
    e.persist();
    this.setState(prevState => ({
      newEntity: {
        ...prevState.newEntity,
        name: e.target.value
      }
    }));
  }

  openDialog = () => {
    this.setState({ dialogOpen: true });
  }

  closeDialog = () => {
    this.setState({
      dialogOpen: false,
    });
  }

  clearNewEntityForm = () => {
    this.setState(prevState => ({
      newEntity: {
        libraryId: '',
        name: ''
      }
    }));
  }

  saveNewEntity = () => {
    const entity = {
      ...this.state.newEntity,
      profileImageUrl: this.state.currentlyEditedFace.object.uri,
    };

    this.props.createEntity({ entity }, {
      selectedEngineId: this.props.selectedEngineId,
      faceObj: this.state.currentlyEditedFace,
    });

    return this.closeDialog();
  }

  renderAddNewEntityModal = () => {
    const { isFetchingLibraries, libraries } = this.props;
    return (
      <Dialog
        open={this.state.dialogOpen}
        onClose={this.closeDialog}
        aria-labelledby="new-entity-title"
        disableBackdropClick
        onExited={this.clearNewEntityForm}
      >
        <DialogTitle id="new-entity-title">Add New</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Identify and help train face recognition engines to find this individual. You can view and add additional images in the Library application.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            required
            value={this.state.newEntity.name || ''}
            onChange={this.setNewEntityName}
          />
          <TextField
            id="select-library"
            select
            label="Choose Library"
            value={this.state.newEntity.libraryId || (libraries.length ? libraries[0].id : 'Loading...')}
            onChange={this.handleNewEntityLibraryChange}
            margin="dense"
            fullWidth
            required
            SelectProps={{
              MenuProps: {
                /* temporary fix to address scrolling issue discussed here: https://github.com/mui-org/material-ui/issues/10601 */
                PaperProps: {
                  style: {
                    transform: 'translate3d(0, 0, 0)'
                  }
                }
              }
            }}
          >
            {isFetchingLibraries
              ? <MenuItem value={'Loading...'}>
                  {'Loading...'}
                </MenuItem>
              : libraries.map(library => (
                <MenuItem key={library.id} value={library.id}>
                  {library.name}
                </MenuItem>
              ))
            }
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={this.saveNewEntity} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  render() {
    const faceEngineProps = pick(this.props, [
      'editMode',
      'engines',
      'entities',
      'currentMediaPlayerTime',
      'entitySearchResults',
      'onEngineChange',
      'selectedEngineId',
      'onFaceOccurrenceClicked',
      'isSearchingEntities'
    ]);

    if (this.props.isFetchingEngineResults || this.props.isFetchingEntities) {
      return (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <CircularProgress size={75} />
        </div>
      );
    }

    if (!this.props.entities.length) {
      return null;
    }

    return (
      <Fragment>
        <FaceEngineOutput
          {...this.props.faces}
          {...faceEngineProps}
          onAddNewEntity={this.handleAddNewEntity}
          onSearchForEntities={debounce(this.handleSearchEntities, 400)}
          onEditFaceDetection={this.handleFaceDetectionEntitySelect}
        />
        {this.renderAddNewEntityModal()}
      </Fragment>
    );
  }
}

export default FaceEngineOutputContainer;