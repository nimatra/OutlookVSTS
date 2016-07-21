import * as React from 'react';
import { Provider } from 'react-redux';
import {Authenticate } from '../../Authenticate/authenticate';
import { Store, createStore } from 'redux';
import {SignInButton } from './SignInButton';
import { Auth, AuthState } from '../../auth';
import { AddInDescription } from './AddInDescription';
import {Users } from './../VSTS';

export class LogInPage extends React.Component<{}, {authState: AuthState, user: Users}> {

  public constructor() {
    super();
    console.log('loginpage');
    this.state = {
        user : Users.Miranda,
        authState : AuthState.Request,
    };

    this.updateAuth();
  }

  private updateAuth(): void {
  var user = Office.context.mailbox.userProfile.emailAddress;
  console.log(user);
    /*Auth.getAuthState(user, (state: AuthState) => {
      this.setState({
        authState: state,
        user: user });
    });
    */
    console.log(this.state.user);
    console.log(this.state.authState);
  }

  public render(): React.ReactElement<Provider> {
    //each component should decide to show itself or not
    switch(this.state.authState){
      case AuthState.Request: //request and !inProgress
        return (<div>
            <AddInDescription />
            <SignInButton />
            </div>);
      default:
        return(<div/>);
      }
  }
 }