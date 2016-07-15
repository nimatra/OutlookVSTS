import * as React from 'react';
import { Provider } from 'react-redux';
import {Authenticate } from '../../Authenticate/authenticate';
import { Store, createStore } from 'redux';
import {Settings } from '../SettingsComponents/Settings';
import { Auth, AuthState } from '../../auth';
import { AddInDescription } from './AddInDescription';

export class LogInPage extends React.Component<{}, {}> {

  public constructor() {
    super(); //required first line
    console.log('login');
  }

  private auth(): void{
    var user = Office.context.mailbox.userProfile.emailAddress;
    window.open('./authenticate?user=' + user);
  }

  public render(): React.ReactElement<Provider> {
    //each component should decide to show itself or not
    return (<div>
      <AddInDescription />
      <Settings />
        </div>);
  }
 }