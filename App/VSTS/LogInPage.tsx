import * as React from 'react';
import { Provider } from 'react-redux';
import {Authenticate } from '../Authenticate/authenticate';
import { Store, createStore } from 'redux';
import {Settings } from './Settings';
import { Auth, AuthState } from '../auth';
import { AddInDescription } from './AddInDescription';

export class LogInPage extends React.Component<{}, {isReady : boolean}> {

  isReady : boolean; // set to false

  private Initialize():void{
    this.isReady = true;
    this.forceUpdate(); //re-renders page
  }

  public constructor() {
    super(); //required first line
    this.isReady = true; //should be false, but doesnt reload
    Office.initialize = this.Initialize;
  }

  private auth(): void{
    var user = Office.context.mailbox.userProfile.emailAddress;
    window.open('./authenticate?user=' + user);
    //return (<Authenticate user = {user}/>);
  }

  public render(): React.ReactElement<Provider> {
    if(this.isReady == false)
    {
      return(<div>loading...</div>);
    }

    //add CSS in folder for reuse in other properties
    var style_img = {
      align: 'center'
    };

    var style_button = {
      backgroundcolor: 'rgb(0,122,204)', // save button blue
      textalign: 'center',
      color: 'rgb(255,255,255)',
      font: "20px arial, sans-serif",
      align: 'center'
    };

    var style_section = {
      color: 'rgb(104,33,122)', // the VS purple
      font: "20px arial, sans-serif",

    };

    var style_text = {
       color: "rgb(30,30,30)", // TODO - change to dark gray
       font: "15px arial, sans-serif",
    };

    var style_bottomlogo = {
      width:'500px',
      height:'120px',
      align: 'center'
    };



    console.log('got to login');
    console.log(AuthState);
    switch (state) {
      case AuthState.None: // We have to wait for Office to initialize, so show a waiting state
        return (<div>Loading</div>);
      case AuthState.Request: // Office has initialized, but we don't have auth for this user, show Log-In Page and pass them to the auth flow
        return (<AddInDescription />
    );
  }
  }

