/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
import { Auth, AuthState } from '../auth';
import { TokenInfo } from './tokenInfo';
import {Authenticate} from '../Authenticate/authenticate';

export class Dogfood extends React.Component<{}, {}> {

  public state: any;

  public constructor() {
    super();
    this.state = {
      authState: AuthState.None,
      authToken: '',
      user: ''
    };
    this.Initialize = this.Initialize.bind(this);
    this.createTask = this.createTask.bind(this);
    this.handleUIChange = this.handleUIChange.bind(this);
    Office.initialize = this.Initialize;
  }

  public Initialize(): void {
    console.log("Initing");
    var user = Office.context.mailbox.userProfile.emailAddress;
    Auth.getAuthState(user, (state:AuthState, token:string) =>{
      this.setState({
        user : user,
        authState : state,
        authToken : token
      });
      this.forceUpdate();
    })
  }

  public createTask(): void{
    $.ajax({
      type: "POST",
      url: 'https://o365exchange.visualstudio.com/DefaultCollection/Outlook Services/Ecosystem - Ext Core/_apis/wit/workitems/Bug?api-version=1.0',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer : ' + this.state.token
      },
      data : [{
        'op' : 'add',
        'path' : '/fields/System.Title',
        'value' : this.state.taskName
      }],
      success : function(response, textStatus, jqXhr){
        console.log("worked" + response);
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log("The following error occured: " + textStatus, errorThrown);
      }
    });
  }

  public handleUIChange(event):void{
    this.setState({taskName: event.target.value});
  }

  public render(): React.ReactElement<Provider> {
    const state: AuthState = this.state.authState;
    const token: string = this.state.authToken;
    const user: string = this.state.user;

    switch (state) {
      case AuthState.None: // We have to wait for Office to initialize, so show a waiting state
        return (<div>Loading</div>);
      case AuthState.Request: // Office has initialized, but we don't have auth for this user, pass them to the auth flow
        return (<Authenticate user={user} />);
      case AuthState.Authorized: // We have auth for this user, go ahead and show something cool
        return (<div>
          <h1>Dogfood</h1> <br />
          <p>Bug Title: <input type="text" value={this.state.taskName} onChange={this.handleUIChange} /></p> <br />
          <button onClick={this.createTask}> Create! </button>
        </div>);
    }
  }
}