import * as React from 'react';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
import { Auth, AuthState } from '../../auth';
import { Authenticate } from '../../Authenticate/authenticate';
import { Settings } from '../SettingsComponents/Settings';
import {Users } from './../VSTS';

export class SignInButton extends React.Component<{}, {authState: AuthState, user: Users}> {
  //note: if auth expires, nav to azure.../done

  public constructor() {
    super();
    console.log('signinbutton');
    this.auth = this.auth.bind(this);
  }

  style_button = {
      background: 'rgb(0,122,204)', // save button blue
      textalign: 'center',
      color: 'rgb(255,255,255)',
      font: "15px arial, ms-segoe-ui",
      align: 'center',
    };

  private auth(): void{
    //var user = Office.context.mailbox.userProfile.emailAddress;
    //console.log(this.state.user);
    window.open('./authenticate?user=' + this.state.user);
    //update visibilityFilter
  }

  public render(): React.ReactElement<Provider> {
    return(
      <div>
      <button className = 'ms-Button' style = {this.style_button} onclick = {this.auth}> Sign in to get started </button>
      </div>);
  }
  }

