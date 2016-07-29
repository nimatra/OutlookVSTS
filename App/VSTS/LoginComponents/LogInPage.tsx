import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { Store, createStore } from 'redux';
import { SignInButton } from './SignInButton';
import { AddInDescription } from './AddInDescription';
import { Auth } from '../../auth';
import { AuthStateEnum, updateAuth } from '../../Redux/FlowActions';

export class LogInPage extends React.Component<{}, {}> {
  //private componentDidMount(): void {}

  public render(): React.ReactElement<Provider> {
    console.log('loginpage');
    return(<div>
            <AddInDescription />
            <SignInButton />
            </div>);
  }

 }

