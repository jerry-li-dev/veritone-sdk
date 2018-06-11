import { get, set, isEqual, cloneDeep } from 'lodash';

// if memory becomes a problem, use immutable js by:
// 1. uncomment lines that have "// with immutable js"
// 2. comment out or remove lines that have "// without immutable js"
// import { fromJS } from 'immutable';  // with immutable js

import { helpers } from 'veritone-redux-common';
const { createReducer } = helpers;

export const transcriptNamespace = 'veritoneTranscriptWidget';
export const UNDO = transcriptNamespace + '_UNDO';
export const REDO = transcriptNamespace + '_REDO';
export const RESET = transcriptNamespace + '_RESET';
export const CHANGE = transcriptNamespace + '_CHANGE';
export const CLEAR_DATA = transcriptNamespace + '_CLEAR_DATA';
export const RECEIVE_DATA = transcriptNamespace + '_RECEIVE_DATA';
export const UPDATE_EDIT_STATUS = transcriptNamespace + '_UPDATE_EDIT_STATUS';

const removeableIndex = 1; // index 0 is reserved for initial value
const maxBulkHistorySize = 100; // Only alow user to undo 50 times in bulk edit
const maxSnippetHistorySize = 500; // Only alow user to undo 500 times in snippet edit
const initialState = {
  data: [],
  past: [],
  future: [],
  present: null,
  isBulkEdit: false
};

const transcriptReducer = createReducer(initialState, {
  [UNDO](state, action) {
    const newPast = state.past || [];
    const newFuture = state.future || [];
    let newCurrentData = state.data || [];
    let newPresent;

    if (newPast.length > 0) {
      newPresent = newPast.pop();
      // newCurrentData = newPresent.toJS();          // with immutable js
      newCurrentData = cloneDeep(newPresent); // without immutable js
      state.present && newFuture.push(state.present);
    } else {
      // newPresent = fromJS(state.data);             // with immutable js
      newPresent = cloneDeep(state.data); // without immutable js
    }

    return {
      ...state,
      data: newCurrentData,
      past: newPast,
      future: newFuture,
      present: newPresent
    };
  },

  [REDO](state, action) {
    const newPast = state.past || [];
    const newFuture = state.future || [];
    let newCurrentData = state.data || [];
    let newPresent;

    if (newFuture.length > 0) {
      newPresent = newFuture.pop();
      // newCurrentData = newPresent.toJS();    // with immutable js
      newCurrentData = cloneDeep(newPresent); // without immutable js
      state.present && newPast.push(state.present);
    } else {
      // newPresent = fromJS(state.data);       // with immutable js
      newPresent = cloneDeep(state.data); // without immutable js
    }

    return {
      ...state,
      data: newCurrentData,
      past: newPast,
      future: newFuture,
      present: newPresent
    };
  },

  [RESET](state, action) {
    const past = state.past || [];
    let initialData;
    let initialPresent;
    if (past.length > 0) {
      initialPresent = past[0];
      // initialData = initialPresent.toJS();   // with immutable js
      initialData = cloneDeep(initialPresent); // without immutable js
    } else {
      initialData = state.data;
      initialPresent = state.present;
    }

    return {
      ...state,
      data: initialData,
      past: [],
      future: [],
      present: initialPresent
    };
  },

  [CHANGE](state, action) {
    let newState = state;
    const editType = action.data.type;
    switch (editType) {
      case 'snippet':
        newState = handleSnippetEdit(state, action);
        break;

      case 'bulk':
        newState = handleBulkEdit(state, action);
        break;
    }

    return newState;
  },

  [CLEAR_DATA](state, action) {
    return { ...state, data: [], past: [], future: [], present: null };
  },

  [RECEIVE_DATA](state, action) {
    const past = state.past;
    const { data } = action;
    // const oldData = (past && past.length > 0) ? past[0].toJS() : state.data;   // without immutable js
    const oldData = get(past, '[0]', state.data); // none immutable js

    if (isEqual(data, oldData)) {
      return { ...state };
    } else {
      // const present = fromJS(data);        // with immutable js
      const present = cloneDeep(data); // without immutable js
      return { ...state, data: data, past: [], future: [], present: present };
    }
  }
});

function handleBulkEdit(state, action) {
  const changedData = action.data.newValue;
  const newData = [
    {
      series: [
        {
          startTimeMs: changedData.startTimeMs,
          stopTimeMs: changedData.stopTimeMs,
          words: [
            {
              word: changedData.value,
              confidence: 1
            }
          ]
        }
      ]
    }
  ];

  const newPast = state.past || [];
  // const newPresent = fromJS(newData);              // with immutable js
  const newPresent = cloneDeep(newData); // without immutable js
  // const prevPresent = state.present;               // with immutable js
  const prevPresent = cloneDeep(state.present); // without immutable js
  newPast.push(prevPresent);
  newPast.length > maxBulkHistorySize && newPast.splice(removeableIndex, 0); // remove extra history
  return {
    ...state,
    data: newData,
    past: newPast,
    future: [],
    present: newPresent,
    isBulkEdit: true
  };
}

function handleSnippetEdit(state, action) {
  const newPast = state.past || [];
  // const prevPresent = state.present;               // with immutable js
  const prevPresent = cloneDeep(state.present); // without immutable js

  const changedData = action.data.newValue;
  const targetData = action.data.originalValue;
  const initialPresent = newPast.length > 0 ? newPast[0] : prevPresent;

  let entryIndex = -1;
  let isNoContent = false;
  const chunkIndex = initialPresent.findIndex(chunk => {
    // const series = chunk.get('series');      // with immutable js
    const series = get(chunk, 'series'); // without immutable js
    entryIndex = series.findIndex(entry => {
      // const orgStartTime = entry.get('startTimeMs');   // with immutable js
      // const orgStopTime = entry.get('stopTimeMs');     // with immutable js
      // const orgWords = entry.get('words');             // with immutable js

      const orgStartTime = get(entry, 'startTimeMs'); // without immutable js
      const orgStopTime = get(entry, 'stopTimeMs'); // without immutable js
      const orgWords = get(entry, 'words', undefined); // without immutable js

      if (
        targetData.startTimeMs === orgStartTime &&
        targetData.stopTimeMs === orgStopTime
      ) {
        if (!orgWords) {
          isNoContent = !targetData.value;
          return isNoContent;
        } else {
          // sort word options base on confidence

          const sortedWords = orgWords.sort(
            (first, second) =>
              // first.get('confidence') < second.get('confidence')   // with immutable js
              get(first, 'confidence') < get(second, 'confidence') // without immutable js
          );

          // const orgValues = sortedWords.first().get('word');     // with immutable js
          const orgValues = get(sortedWords, '[0].word'); // without immutable js
          return orgValues === targetData.value;
        }
      }

      return false;
    });
    return entryIndex >= 0;
  });

  if (chunkIndex >= 0 && entryIndex >= 0) {
    newPast.length > maxSnippetHistorySize &&
      newPast.splice(removeableIndex, 0); // remove extra history

    newPast.push(prevPresent);
    let newPresent;
    newPresent = cloneDeep(prevPresent); // without immutable js
    if (isNoContent) {
      const newSnippet = {
        startTimeMs: changedData.startTimeMs,
        stopTimeMs: changedData.stopTimeMs,
        words: [
          {
            word: changedData.value,
            confidence: 1
          }
        ]
      };
      // newPresent = prevPresent.setIn([chunkIndex, 'series', entryIndex], newSnippet);  // with immutable js
      const contentPath = `[${chunkIndex}].series[${entryIndex}]`; // without immutable js
      set(newPresent, contentPath, newSnippet); // without immutable js
    } else {
      // newPresent = prevPresent.setIn([chunkIndex, 'series', entryIndex, 'words'], [{word: changedData.value, confidence: 1}]);    // with immutable js
      const contentPath = `[${chunkIndex}].series[${entryIndex}].words`; // without immutable js
      set(newPresent, contentPath, [
        { word: changedData.value, confidence: 1 }
      ]); // without immutable js
    }

    // const newData = newPresent.toJS();        // with immutable js
    const newData = cloneDeep(newPresent); // without immutable js
    return {
      ...state,
      data: newData,
      past: newPast,
      future: [],
      present: newPresent,
      isBulkEdit: false
    };
  } else {
    return { ...state, past: newPast, isBulkEdit: false };
  }
}

export default transcriptReducer;
export const undo = () => ({ type: UNDO });
export const redo = () => ({ type: REDO });
export const reset = () => ({ type: RESET });
export const change = newData => ({ type: CHANGE, data: newData });
export const clearData = () => ({ type: CLEAR_DATA });
export const receiveData = newData => ({ type: RECEIVE_DATA, data: newData });
export const updateEditStatus = state => ({
  type: UPDATE_EDIT_STATUS,
  hasChanged: this.hasChanged(state)
});
export const currentData = state => get(state[transcriptNamespace], 'data');
export const hasChanged = state => {
  const history = get(state[transcriptNamespace], 'past');
  return history && history.length > 0;
};
export const getTranscriptEditAssetData = state => {
  const { isBulkEdit, data } = state[transcriptNamespace];

  const changedData = {
    isBulkEdit: isBulkEdit,
    sourceEngineId: 'bde0b023-333d-acb0-e01a-f95c74214607',
    sourceEngineName: 'User Generated'
  };

  if (isBulkEdit) {
    changedData.text = get(data, '[0].series[0].words[0].word', '');
  } else {
    let series = [];
    data.forEach(chunk => {
      series = series.concat(chunk.series);
    });
    changedData.series = series;
  }

  return changedData;
};