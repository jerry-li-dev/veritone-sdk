import { select, call } from 'redux-saga/effects';
import { modules, helpers } from 'veritone-redux-common';

const { fetchGraphQLApi } = helpers;
const {
  auth: authModule,
  config: configModule,
} = modules;

// URI Parser from https://stackoverflow.com/a/39308026
export const ParseURI = url => {
  /* eslint-disable */
  let m = url.match(
      /^(([^:\/?#]+:)?(?:\/\/(([^\/?#:]*)(?::([^\/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/
    ),
    r = {
      hash: m[8] || '', // #asd
      host: m[3] || '', // localhost:257
      hostname: m[4] || '', // localhost
      href: m[0] || '', // http://localhost:257/deploy/?asd=asd#asd
      origin: m[1] || '', // http://localhost:257
      pathname: m[6] || (m[1] ? '/' : ''), // /deploy/
      port: m[5] || '', // 257
      protocol: m[2] || '', // http:
      search: m[7] || '' // ?asd=asd
    };
  if (r.protocol.length === 2) {
    r.protocol = 'file:///' + r.protocol.toUpperCase();
    r.origin = r.protocol + '//' + r.host;
  }
  r.href = r.origin + r.pathname + r.search + r.hash;
  return m && r;
};

// http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4()}-${s4()}-${s4()}`;
}

export function* getGqlParams() {
  const config = yield select(configModule.getConfig);
  const { apiRoot, graphQLEndpoint } = config;
  const graphQLUrl = `${apiRoot}/${graphQLEndpoint}`;
  const sessionToken = yield select(authModule.selectSessionToken);
  const oauthToken = yield select(authModule.selectOAuthToken);
  const token = sessionToken || oauthToken;
  return {
    graphQLUrl,
    token
  };
}


export function* handleRequest({ query, variables }) {
  const { graphQLUrl, token } = yield call(getGqlParams);
  let response;
  try {
    response = yield call(fetchGraphQLApi, {
      endpoint: graphQLUrl,
      query,
      variables,
      token
    });
    if (response.errors) {
      throw new Error(response.errors)
    }
  } catch (error) {
    console.log('error', error)
    return {
      error,
    }
  }
  return {
    error: null,
    response
  };
}
export const getDateTimeNow = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  let house = date.getHours();
  let min = date.getMinutes();

  if (dt < 10) {
      dt = "0" + dt;
  }
  if (month < 10) {
      month = "0" + month;
  }
  if (house < 10) {
      house = "0" + house;
  }
  if (min < 10) {
      min = "0" + min;
  }
  return year + "-" + month + "-" + dt + "T" + house + ":" + min;
}