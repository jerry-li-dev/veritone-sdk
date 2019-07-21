import {
  get,
  uniqWith,
  isEqual,
  isEmpty
} from 'lodash';
import { helpers, modules } from 'veritone-redux-common';
const { createReducer, fetchGraphQLApi } = helpers;
const { selectSessionToken, selectOAuthToken } = modules.auth;
const { getConfig } = modules.config;


export const namespace  = 'folderSelectionDialog';
export const FETCH_ROOT_FOLDER  = `vtn/${namespace}/FETCH_ROOT_FOLDER`;
export const SELECTED_FOLDER  = `vtn/${namespace}/SELECTED_FOLDER`;
export const FETCH_SUB_FOLDERS  = `vtn/${namespace}/FETCH_SUB_FOLDERS`;


const defaultState = {
  selectedFolder: {},
  folderList: [],
  subFolderList: {},
  rootFolder: {}
};

export const rootFolder = (state) => {
  return get(local(state), 'rootFolder');
};

export const selectedFolder = (state) => {
  return get(local(state), 'selectedFolder');
};

export const subFolderList = (state) => {
  return get(local(state), 'subFolderList')
};


const reducer  = createReducer(defaultState, {
  [FETCH_ROOT_FOLDER](state, action){
    const folder = get(action, 'payload');
    return {
      ...state,
      rootFolder: folder
    }
  },

  [SELECTED_FOLDER](state, action){
    const selected = get(action, 'selected');
    return {
      ...state,
      selectedFolder: selected
    }
  },

  [FETCH_SUB_FOLDERS](state, action){
    let folders = get(action, 'payload')
    let previousFolders = get(state, 'subFolderList');
    let newSubfolderList = {...previousFolders, ...folders};
    return {
      ...state,
      subFolderList: newSubfolderList
    }
  }

});

export default reducer;

function local(state) {
  return state[namespace];
}



export const selectFolder = (folder) => {
  return {
    type: SELECTED_FOLDER,
    selected: folder
  };
};


export function getFolders() {
  return async function action(dispatch, getState) {
   
    let rootFolderType = "cms";

    const query = `
      mutation createRootFolders($rootFolderType: RootFolderType ){
        createRootFolders(rootFolderType: $rootFolderType) {
          id,
          name,
          treeObjectId,
          organizationId,
          ownerId,
          typeId,
          orderIndex,
          childTDOs {
            count
            records{
              id
            }
          }
          childFolders {
            count
          }
        }
      }
    `;

    const config = getConfig(getState());
    const { apiRoot, graphQLEndpoint } = config;
    const graphQLUrl = `${apiRoot}/${graphQLEndpoint}`;

    try {
      const response = await fetchGraphQLApi({
        endpoint: graphQLUrl,
        query,
        variables: {
          rootFolderType,
        },
        token: selectSessionToken(getState()) || selectOAuthToken(getState())
      });

      if (!isEmpty(response.errors)){
        throw response.errors;
      }

      const folder = get(response, 'data.createRootFolders[0]');
      
      dispatch({
        type: FETCH_ROOT_FOLDER,
        payload: folder
      });

      dispatch(getAllSubFolders(folder));

    } catch (err) {
      // dispatch({
      //   type: FETCH_ENGINES_FAILURE,
      //   payload: err,
      //   meta: { filters }
      // });
      console.log(err)
    }
  };
}



// A function that accepts a folder object and fetches all childFolders until the records returned is
  // less than the CHILD_FOLDER_LIMIT


export function getAllSubFolders(folder) {
  const childFolders = get(folder, 'childFolders.records', []);
  const limit  = 30;
 
  return getMoreSubFolders(
    {
      folderId: folder.treeObjectId,
      limit: limit,
      offset: childFolders.length
    },
    childFolders
  );
}






export function getMoreSubFolders( variables, accumulator = []) {

  return async function action(dispatch, getState) {

    const query = `
      query getChildFolders($folderId: ID!, $limit: Int, $offset: Int) {
        folder(id: $folderId) {
          childFolders(limit: $limit, offset: $offset) {
            count
            limit
            offset
            records {
              id,
              treeObjectId,
              orderIndex,
              name,
              description,
              modifiedDateTime,
              status,
              typeId,
              parent {
                treeObjectId
              }
              childFolders {
                count
              }
             
            }
          }
        }
      }
    `;

    const config = getConfig(getState());
    const { apiRoot, graphQLEndpoint } = config;
    const graphQLUrl = `${apiRoot}/${graphQLEndpoint}`;
    let folderList;
    try {
      const res = await fetchGraphQLApi({
        endpoint: graphQLUrl,
        query,
        variables,
        token: selectSessionToken(getState()) || selectOAuthToken(getState())
      })

      const newChildFolders = get(res, 'data.folder.childFolders.records', []);

      if (get(res, 'data.folder.childFolders.count') < variables.limit) {
        folderList = accumulator.concat(newChildFolders)

        let key = variables.folderId;

        const subfolders = {
          [key] : folderList
        };

        dispatch({
          type: FETCH_SUB_FOLDERS,
          payload: subfolders,
        });
      } else {

        dispatch(getMoreSubFolders(
          {
            ...variables,
            offset: newChildFolders.length + accumulator.length
          },
          accumulator.concat(newChildFolders)
        ));
      }
    } catch (err) {
      // dispatch({
      //   type: FETCH_ENGINES_FAILURE,
      //   payload: err,
      //   meta: { filters }
      // });
      console.log(err)
    }
  };
}

export function createFolder(name, description, parentId, orderIndex, appType, folder) {
  return async function action(dispatch, getState) {

    let variables  = {
      name: name,
      description: description,
      parentId: parentId,
      orderIndex: orderIndex,
      rootFolderType: appType
    };

    const query = `
      mutation {
        createFolder(input: {
          name: "${name}",
          description: "${description}",
          parentId: "${parentId}",
          orderIndex: ${orderIndex},
          rootFolderType: ${appType}
        }) {
          id,
          treeObjectId,
          orderIndex,
          name,
          description,
          modifiedDateTime,
          status,
          parent {
            treeObjectId
          }
          childFolders {
            count
          }
        }
      }
    `;

    const config = getConfig(getState());
    const { apiRoot, graphQLEndpoint } = config;
    const graphQLUrl = `${apiRoot}/${graphQLEndpoint}`;

    try {
      const response = await fetchGraphQLApi({
        endpoint: graphQLUrl,
        query,
        variables,
        token: selectSessionToken(getState()) || selectOAuthToken(getState())
      });
      dispatch(getAllSubFolders(folder))

    } catch (err) {
      // dispatch({
      //   type: FETCH_ENGINES_FAILURE,
      //   payload: err,
      //   meta: { filters }
      // });
      console.log(err)
    }
  };
}

