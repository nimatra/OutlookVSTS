/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
<<<<<<< HEAD
import {LogInPage } from './LoginComponents/LogInPage';
import {Settings} from './SettingsComponents/Settings';
import {Auth, AuthState} from '../auth';
import {Test } from './TestComponents/Test';
import {Error } from './Error'
export enum Users { None, EmilyT, EmilyZ, Miranda}

export class VSTS extends React.Component<{}, any> {

  public constructor(){
    super();
    this.state = {
        user : Users.None,
        authState : AuthState.None,
=======
import {LogInPage } from './LogInPage';
import {Settings} from './Settings';

enum Users { None, EmilyT, EmilyZ, Miranda}

export class VSTS extends React.Component<{}, any/*{user: Users}*/> {

  public constructor(){
    super();
    this.state = {user:Users.None,
      ready:false
>>>>>>> 9c3c47b124b5d7c1a1aecd1c8ef4480cf4728c6e
    };
    this.setEmilyT = this.setEmilyT.bind(this);
    this.setEmilyZ = this.setEmilyZ.bind(this);
    this.setMiranda = this.setMiranda.bind(this);
<<<<<<< HEAD
    Office.initialize = this.Initialize.bind(this);
=======
    this.Initialize = this.Initialize.bind(this);
    Office.initialize = this.Initialize;
>>>>>>> 9c3c47b124b5d7c1a1aecd1c8ef4480cf4728c6e
  }

  private Initialize():void{
    console.log("Initiating");
<<<<<<< HEAD
    this.updateAuth();
    //console.log(this.state.user);
    //console.log(this.state.authState);
  }

  private updateAuth(): void {
  var user = this.state.user;
    Auth.getAuthState(user, (state: AuthState) => {
      this.setState({
        authState: state,
        user: user });
    });

    console.log(this.state.user);
    console.log(this.state.authState);
    this.setState({ready:true});
    console.log(this.state.ready);
    //this.forceUpdate();
  }

  public setEmilyT():void{this.setState({user:Users.EmilyT})}
  public setEmilyZ():void{this.setState({user:Users.EmilyZ})}
  public setMiranda():void{this.setState({user:Users.Miranda})}

  public render(): React.ReactElement<Provider> {

    switch(this.state.authState) {
      case AuthState.None:// We have to wait for Office to initialize, so show a waiting state
        return (<div>Loading...</div>);
      default:
        console.log('default');
    }

    console.log('got to vsts');
    const user : Users = this.state.user;
    var bool = true;
    //form updates state
    switch(user)
    {
      case Users.EmilyT:
        return(<div>Emily T's addIn</div>);
      case Users.EmilyZ:
        return(<div>Emily Z's addIn</div>);
      case Users.Miranda:
        return(<Settings />
              );
      default:
        return(<div><button onClick={this.setEmilyT}>EmilyT</button><button onClick={this.setEmilyZ}>EmilyZ</button><button onClick={this.setMiranda}>Miranda</button></div>);
    }
  }
 }

 /*
 <Test />
 <Error isVisible = {bool} message = "No error, just tests."/>
 <LogInPage />*/