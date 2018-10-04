export const namespace = 'face-engine-output';

export const FETCH_ENTITIES = `vtn/${namespace}/FETCH_ENTITIES`;
export const FETCH_ENTITIES_SUCCESS = `vtn/${namespace}/FETCH_ENTITIES_SUCCESS`;
export const FETCH_ENTITIES_FAILURE = `vtn/${namespace}/FETCH_ENTITIES_FAILURE`;

export const FETCH_LIBRARIES = `vtn/${namespace}/FETCH_LIBRARIES`;
export const FETCH_LIBRARIES_SUCCESS = `vtn/${namespace}/FETCH_LIBRARIES_SUCCESS`;
export const FETCH_LIBRARIES_FAILURE = `vtn/${namespace}/FETCH_LIBRARIES_FAILURE`;

export const CREATE_ENTITY = `vtn/${namespace}/CREATE_ENTITY`;
export const CREATE_ENTITY_SUCCESS = `vtn/${namespace}/CREATE_ENTITY_SUCCESS`;
export const CREATE_ENTITY_FAILURE = `vtn/${namespace}/CREATE_ENTITY_FAILURE`;

export const SEARCH_ENTITIES = `vtn/${namespace}/SEARCH_ENTITIES`;
export const SEARCHING_ENTITIES = `vtn/${namespace}/SEARCHING_ENTITIES`;
export const SEARCH_ENTITIES_SUCCESS = `vtn/${namespace}/SEARCH_ENTITIES_SUCCESS`;
export const SEARCH_ENTITIES_FAILURE = `vtn/${namespace}/SEARCH_ENTITIES_FAILURE`;

export const ADD_DETECTED_FACE = `vtn/${namespace}/ADD_DETECTED_FACE`;
export const REMOVE_DETECTED_FACE = `vtn/${namespace}/REMOVE_DETECTED_FACE`;
export const CANCEL_FACE_EDITS = `vtn/${namespace}/CANCEL_FACE_EDITS`;

export const OPEN_CONFIRMATION_DIALOG = `vtn/${namespace}/OPEN_CONFIRMATION_DIALOG`;
export const CLOSE_CONFIRMATION_DIALOG = `vtn/${namespace}/CLOSE_CONFIMATION_DIALOG`;

import {
  get,
  map,
  find,
  keyBy,
  isEmpty,
  pick,
  flatten,
  noop,
  reduce,
  cloneDeep
} from 'lodash';
import { helpers, modules } from 'veritone-redux-common';
import { createSelector } from 'reselect';

const { createReducer } = helpers;
const { engineResults: engineResultsModule } = modules;

const defaultState = {
  entities: {},
  libraries: {},
  entitySearchResults: [],
  isFetchingEntities: false,
  isFetchingLibraries: false,
  isSearchingEntities: false,
  facesDetectedByUser: {},
  facesRemovedByUser: {},
  showConfirmationDialog: false,
  confirmationAction: noop,
  displayUserEdited: false
};

const reducer = createReducer(defaultState, {
  [FETCH_ENTITIES](state, action) {
    return {
      ...state,
      isFetchingEntities: true
    };
  },
  [FETCH_ENTITIES_SUCCESS](state, action) {
    if (action.payload.errors) {
      return this[FETCH_ENTITIES_FAILURE](state, action);
    }

    const entities = keyBy(Object.values(action.payload.data), 'id');

    return {
      ...state,
      entities: {
        ...state.entities,
        ...entities
      },
      isFetchingEntities: false
    };
  },
  [FETCH_ENTITIES_FAILURE](state, action) {
    return {
      ...state,
      isFetchingEntities: false
    };
  },
  [FETCH_LIBRARIES](state, action) {
    return {
      ...state,
      isFetchingLibraries: true
    };
  },
  [FETCH_LIBRARIES_SUCCESS](state, action) {
    if (action.payload.errors) {
      return this[FETCH_LIBRARIES_FAILURE](state, action);
    }

    const libraries = keyBy(action.payload.data.libraries.records, 'id');

    return {
      ...state,
      libraries: {
        ...state.libraries,
        ...libraries
      },
      isFetchingLibraries: false
    };
  },
  [FETCH_LIBRARIES_FAILURE](state, action) {
    return {
      ...state,
      isFetchingLibraries: false
    };
  },
  [CREATE_ENTITY_SUCCESS](state, action) {
    if (action.payload.errors) {
      return this[CREATE_ENTITY_FAILURE](state, action);
    }

    const payload = {
      ...pick(action.meta, ['faceObj', 'selectedEngineId']),
      entity: action.payload.data.entity
    };

    return this[ADD_DETECTED_FACE](state, { payload });
  },
  [CREATE_ENTITY_FAILURE](state, action) {
    return {
      ...state
    };
  },
  [SEARCHING_ENTITIES](state, action) {
    return {
      ...state,
      isSearchingEntities: true
    };
  },
  [SEARCH_ENTITIES_SUCCESS](state, action) {
    if (action.payload.errors) {
      return this[SEARCH_ENTITIES_FAILURE](state, action);
    }

    const entitySearchResults = [];

    get(action.payload.data, 'libraries.records', []).forEach(
      libraryEntities => {
        if (libraryEntities.entities.records.length) {
          entitySearchResults.push(libraryEntities.entities.records);
        }
      }
    );

    return {
      ...state,
      entitySearchResults: flatten(entitySearchResults),
      isSearchingEntities: false
    };
  },
  [SEARCH_ENTITIES_FAILURE](state, action) {
    return {
      ...state,
      isSearchingEntities: false
    };
  },
  [ADD_DETECTED_FACE](state, action) {
    const { faceObj, selectedEngineId, entity } = action.payload;

    return {
      ...state,
      facesDetectedByUser: {
        ...state.facesDetectedByUser,
        [selectedEngineId]: [
          ...(state.facesDetectedByUser[selectedEngineId] || []),
          {
            ...faceObj,
            object: {
              ...faceObj.object,
              entityId: entity.id,
              libraryId: entity.libraryId
            }
          }
        ]
      },
      entities: {
        ...state.entities,
        [entity.id]: entity
      }
    };
  },
  [REMOVE_DETECTED_FACE](state, action) {
    const { faceObj, selectedEngineId } = action.payload;

    return {
      ...state,
      facesRemovedByUser: {
        ...state.facesRemovedByUser,
        [selectedEngineId]: [
          ...(state.facesRemovedByUser[selectedEngineId] || []),
          {
            ...faceObj
          }
        ]
      }
    };
  },
  [CANCEL_FACE_EDITS](state, action) {
    return {
      ...state,
      facesDetectedByUser: {},
      facesRemovedByUser: {}
    };
  },
  [OPEN_CONFIRMATION_DIALOG](state, action) {
    const { confirmationAction } = action.payload;
    return {
      ...state,
      showConfirmationDialog: true,
      confirmationAction: confirmationAction || noop
    };
  },
  [CLOSE_CONFIRMATION_DIALOG](state, action) {
    return {
      ...state,
      showConfirmationDialog: false,
      confirmationAction: noop
    };
  }
});
export default reducer;

function local(state) {
  return state[namespace];
}

export const getFaceDataByEngine = (state, tdoId, engineId) => {
  return engineResultsModule.engineResultsByEngineId(state, tdoId, engineId);
};

export const getUserDetectedFaces = (state, engineId) =>
  get(local(state), ['facesDetectedByUser', engineId]);

export const getUserRemovedFaces = (state, engineId) =>
  get(local(state), ['facesRemovedByUser', engineId]);

export const pendingUserEdits = (state, engineId) =>
  !isEmpty(getUserDetectedFaces(state, engineId)) ||
  !isEmpty(getUserRemovedFaces(state, engineId));

/* ENTITIES */
export const fetchingEntities = meta => ({
  type: FETCH_ENTITIES,
  meta
});
export const fetchEntitiesSuccess = (payload, meta) => ({
  type: FETCH_ENTITIES_SUCCESS,
  payload,
  meta
});
export const fetchEntitiesFailure = (error, meta) => ({
  type: FETCH_ENTITIES_FAILURE,
  error,
  meta
});
export const createEntity = (payload, meta) => ({
  type: CREATE_ENTITY,
  payload,
  meta
});
export const createEntitySuccess = (payload, meta) => ({
  type: CREATE_ENTITY_SUCCESS,
  payload,
  meta
});
export const createEntityFailure = (payload, meta) => ({
  type: CREATE_ENTITY_FAILURE,
  payload,
  meta
});

export const fetchingEntitySearchResults = () => ({
  type: SEARCHING_ENTITIES
});
export const fetchEntitySearchResults = (libraryType, searchText) => ({
  type: SEARCH_ENTITIES,
  payload: {
    libraryType,
    searchText
  }
});
export const fetchEntitySearchResultsSuccess = (payload, meta) => ({
  type: SEARCH_ENTITIES_SUCCESS,
  payload,
  meta
});
export const fetchEntitySearchResultsFailure = (payload, meta) => ({
  type: SEARCH_ENTITIES_FAILURE,
  payload,
  meta
});

export function isFetchingEntities(state) {
  return local(state).isFetchingEntities;
}

export function isSearchingEntities(state) {
  return local(state).isSearchingEntities;
}

export const getEntities = state =>
  Object.values(get(local(state), 'entities', []));

export function getEntitySearchResults(state) {
  return get(local(state), 'entitySearchResults', []);
}

/* LIBRARIES */
export const fetchLibraries = payload => ({
  type: FETCH_LIBRARIES,
  payload
});
export const fetchLibrariesSuccess = (payload, meta) => ({
  type: FETCH_LIBRARIES_SUCCESS,
  payload,
  meta
});
export const fetchLibrariesFailure = (payload, meta) => ({
  type: FETCH_LIBRARIES_FAILURE,
  payload,
  meta
});

export function isFetchingLibraries(state) {
  return local(state).isFetchingLibraries;
}

export function getLibraries(state) {
  return Object.values(local(state).libraries);
}

/* USER DETECTED FACES */
export const addDetectedFace = (selectedEngineId, faceObj, entity) => ({
  type: ADD_DETECTED_FACE,
  payload: {
    selectedEngineId,
    faceObj,
    entity
  }
});

export const removeDetectedFace = (selectedEngineId, faceObj) => ({
  type: REMOVE_DETECTED_FACE,
  payload: {
    selectedEngineId,
    faceObj
  }
});

export const cancelFaceEdits = () => ({
  type: CANCEL_FACE_EDITS
});

/* CONFIRMATION DIALOG */
export const openConfirmationDialog = confirmationAction => {
  return {
    type: OPEN_CONFIRMATION_DIALOG,
    payload: {
      confirmationAction
    }
  };
};

export const closeConfirmationDialog = () => ({
  type: CLOSE_CONFIRMATION_DIALOG
});

export const showConfirmationDialog = state =>
  get(local(state), 'showConfirmationDialog');

export const confirmationAction = state =>
  get(local(state), 'confirmationAction');

/* SELECTORS */
export const getFaces = createSelector(
  [getFaceDataByEngine, getUserDetectedFaces, getUserRemovedFaces, getEntities],
  (faceData, userDetectedFaces, userRemovedFaces, entities) => {
    const faceEntities = {
      unrecognizedFaces: [],
      recognizedFaces: {}
    };

    // flatten data series for currently selected engine
    const faceSeries = addUserDetectedFaces(
      faceData,
      userDetectedFaces,
      userRemovedFaces
    ).reduce((accumulator, faceSeries) => {
      if (!isEmpty(faceSeries.series)) {
        return [...accumulator, ...faceSeries.series];
      }
      return accumulator;
    }, []);

    faceSeries.forEach(faceObj => {
      // for each face object
      // locate entity that the face object belongs to
      const entity = find(entities, { id: faceObj.object.entityId });

      if (
        !faceObj.object.entityId ||
        !entities.length ||
        !entity ||
        !entity.name
      ) {
        // face not recognized
        faceEntities.unrecognizedFaces.push(faceObj);
      } else if (faceEntities.recognizedFaces[faceObj.object.entityId]) {
        faceEntities.recognizedFaces[faceObj.object.entityId].push(faceObj);
      } else {
        faceEntities.recognizedFaces[faceObj.object.entityId] = [faceObj];
      }
    });

    return faceEntities;
  }
);

/* HELPERS */
export const getFaceEngineAssetData = (state, tdoId, engineId) => {
  const engineResults = cloneDeep(getFaceDataByEngine(state, tdoId, engineId));
  const userDetectedFaces =
    cloneDeep(getUserDetectedFaces(state, engineId)) || [];
  const userRemovedFaces =
    cloneDeep(getUserRemovedFaces(state, engineId)) || [];

  const allJsonData = addUserDetectedFaces(
    engineResults,
    userDetectedFaces,
    userRemovedFaces
  ).reduce((accumulator, engineResult) => {
    const userEdited = {};
    if (engineResult.sourceEngineName) {
      userEdited.sourceEngineName = engineResult.sourceEngineName;
    }
    return [
      ...accumulator,
      {
        ...userEdited,
        ...engineResult
      }
    ];
  }, []);

  return allJsonData;
};

function addUserDetectedFaces(
  engineResults,
  userDetectedFaces,
  userRemovedFaces
) {
  return map(engineResults, data => ({
    taskId: data.taskId,
    assetId: data.assetId,
    sourceEngineId: data.sourceEngineId,
    series: reduce(
      data.series,
      (accumulator, originalFaceObj) => {
        if (find(userRemovedFaces, { guid: originalFaceObj.guid })) {
          return accumulator;
        }
        return [
          ...accumulator,
          find(userDetectedFaces, { guid: originalFaceObj.guid }) ||
            originalFaceObj
        ];
      },
      []
    )
  }));
}
