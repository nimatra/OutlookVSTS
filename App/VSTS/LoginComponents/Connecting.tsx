import * as React from 'react';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
import { Auth, AuthState } from '../../auth';
import { Authenticate } from '../../Authenticate/authenticate';
import { Settings } from '../SettingsComponents/Settings';
import {Users } from './../VSTS';

export class Connecting extends React.Component<{}, {authState: AuthState, user: Users}> {
  //note: if auth expires, nav to azure.../done

  public constructor() {
    super();
    console.log('connecting...');
    this.state = {
        user : Users.Miranda,
        authState : AuthState.Authorized,
    };

    this.updateAuth();
  }

  private updateAuth(): void {
  var user = Office.context.mailbox.userProfile.emailAddress;
  console.log(user);
    Auth.getAuthState(user, (state: AuthState) => {
      this.setState({
        authState: state,
        user: user });
    });

    console.log(this.state.user);
    console.log(this.state.authState);
  }

  public render(): React.ReactElement<Provider> {
    this.updateAuth();

    //console.log(this.state.authState);
    switch(this.state.authState){
    case AuthState.Request: // request and inProgress
      return(<div>
        Connecting...
        </div>);
    default:
      return(<div/>);
  }
  }
 }

