import React from 'react';
import { map } from 'lodash';
import { withProps } from 'recompose';
import { bool, func, objectOf, any } from 'prop-types';
import { connect } from 'react-redux';
import Switch from 'material-ui/Switch';
import { AppContainer } from 'veritone-react-common';
import { modules } from 'veritone-redux-common';

const { user } = modules;
import VeritoneApp from './VeritoneApp';
import devConfig from '../../config.dev.json';
import { OAuthLoginButtonWidget } from '../components/OAuthLoginButton';

const app = VeritoneApp();

@withProps({
  store: app._store
})
@connect(state => ({
  userIsAuthenticated: user.userIsAuthenticated(state),
  fetchUserFailed: user.fetchingFailed(state)
}))
export default class BaseStory extends React.Component {
  static propTypes = {
    widget: func.isRequired,
    widgetProps: objectOf(any),
    widgetInstanceMethods: objectOf(func),
    componentProps: objectOf(any),
    componentClass: func.isRequired,
    store: objectOf(any).isRequired, // redux store

    userIsAuthenticated: bool,
    fetchUserFailed: bool
  };

  state = {
    showingWidget: false,
    sessionToken: ''
  };

  componentDidMount() {
    this._oauthButton = new OAuthLoginButtonWidget({
      mode: 'authCode',
      elId: 'login-button-widget-auth-code',
      OAuthURI: 'http://local.veritone-sample-app.com:5001/auth/veritone'
    });

    this._oauthButtonImplicit = new OAuthLoginButtonWidget({
      mode: 'implicit',
      elId: 'login-button-widget-implicit',
      clientId: devConfig.clientId,
      redirectUri: window.origin
    });
  }

  componentWillUnmount() {
    this._widget && this._widget.destroy();
    this._oauthButton.destroy();
    this._oauthButtonImplicit.destroy();
  }

  mountOrDestroyWidgetIfNeeded = () => {
    if (!this.state.showingWidget) {
      this._widget && this._widget.destroy();
      return;
    }

    this._widget = new this.props.widget({
      elId: 'widget',
      ...this.props.widgetProps
    });
  };

  handleLogin = () => {
    return VeritoneApp().login({ sessionToken: this.state.sessionToken });
  };

  handleSwitchComponentType = event => {
    this.setState(
      { showingWidget: event.target.checked },
      this.mountOrDestroyWidgetIfNeeded
    );
  };

  handleChangeSessionToken = e => {
    this.setState({
      sessionToken: e.target.value
    });
  };

  render() {
    return (
      <div>
        <span id="widget" />

        {this.state.showingWidget && (
          <div>
            {map(this.props.widgetInstanceMethods, (handler, key) => (
              // eslint-disable-next-line
              <button key={key} onClick={() => handler(this._widget)}>
                {key}
              </button>
            ))}
          </div>
        )}

        {!this.state.showingWidget && (
          <this.props.componentClass
            store={this.props.store} // eslint-disable-line
            {...this.props.componentProps}
          />
        )}

        <AppContainer appBarOffset>
          <p>
            <Switch onChange={this.handleSwitchComponentType} />
            {this.state.showingWidget ? 'Widget' : 'Component'}
          </p>
          {this.props.fetchUserFailed && (
            <p>failed to log in-- is your token wrong?</p>
          )}

          {!this.props.userIsAuthenticated && (
            <div>
              <p>
                <input
                  type="text"
                  value={this.state.sessionToken}
                  onChange={this.handleChangeSessionToken}
                />
                <button
                  onClick={this.handleLogin}
                  disabled={!this.state.sessionToken}
                >
                  {this.state.sessionToken
                    ? 'Log In via session token'
                    : 'Log In via session token (Please set a token)'}
                </button>
              </p>
              or log in via oauth:
              <p>
                implicit:
                <span id="login-button-widget-implicit" />
                auth code:
                <span id="login-button-widget-auth-code" />
              </p>
            </div>
          )}
        </AppContainer>
      </div>
    );
  }
}