import * as React from 'react';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
import { Auth, AuthState } from '../../auth';
import { Authenticate } from '../../Authenticate/authenticate';
import { Settings } from '../SettingsComponents/Settings';
import {Users } from './../VSTS';

export class AddInDescription extends React.Component<{}, {authState: AuthState, user: Users}> {
  //note: if auth expires, nav to azure.../done

  public constructor() {
    super();
    console.log('got to addindescr');
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

  private auth(): void{
    //var user = Office.context.mailbox.userProfile.emailAddress;
    //console.log(this.state.user);
    window.open('./authenticate?user=' + this.state.user);
  }

  public render(): React.ReactElement<Provider> {
    this.updateAuth();
    var style_img = {
      align: 'center',
    };

    var style_button = {
      background: 'rgb(0,122,204)', // save button blue
      textalign: 'center',
      color: 'rgb(255,255,255)',
      font: "20px arial, sans-serif",
      align: 'center',
    };

    var style_section = {
      color: 'rgb(104,33,122)', // the VS purple
      font: "20px arial, sans-serif",
    };

    var style_text = {
       color: "rgb(118,118,118)", // dark gray
       font: "15px arial, sans-serif",
    };

    //console.log(this.state.authState);
    switch(this.state.authState){
    case AuthState.Request: // Office has initialized, but we don't have auth for this user, show Log-In Page and pass them to the auth flow
      return(<div>
      <div><image src = './images/logo.png' style = {style_img}/></div>
      <div><button onClick={this.auth} style = {style_button}>Sign in to get started</button></div>
      <hr/>
      <div>
        <h1 style = {style_section}> Create work items</h1>
        <p  style = {style_text}>Turn an email thread into a work item directly from Outlook!</p>
      </div>
      <div>
        <h1 style = {style_section}> Communicate with your team </h1>
        <p style = {style_text}> Once the work item is created, use the reply-all quick-action to share work item details with others, or copy the information </p>
      </div>
      </div>
    );
    default:
      return(<div/>);
  }
  }
 }

