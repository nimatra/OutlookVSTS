/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
import {LogInPage } from './LogInPage';
import {Settings} from './Settings';
import {Auth, AuthState} from '../auth';
import {Temp } from './Temp'

enum Users { None, EmilyT, EmilyZ, Miranda}

export class VSTS extends React.Component<{}, any/*{user: Users}*/> {

  public constructor(){
    super();
    this.state = {
        user : Users.None,
        authState : AuthState.Request,
        authToken : ''
    };
    this.setEmilyT = this.setEmilyT.bind(this);
    this.setEmilyZ = this.setEmilyZ.bind(this);
    this.setMiranda = this.setMiranda.bind(this);
    this.Initialize = this.Initialize.bind(this);
    Office.initialize = this.Initialize;
  }

  private Initialize():void{
    console.log("Initiating");
    var user = Office.context.mailbox.userProfile.emailAddress;
    console.log('user:'+user);
    console.log('state:'+this.state.authState);
    Auth.getAuthState(user, (state:AuthState, token:string) =>{
      this.setState({
        user : user,
        authState : state,
        authToken : token
      });
    })
    console.log(this.state.user);
    console.log(this.state.authState);
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

    switch(user)
    {
      case Users.EmilyT:
        return(<div>Emily T's addIn</div>);
      case Users.EmilyZ:
        return(<div>Emily Z's addIn</div>);
      case Users.Miranda:
        return(<LogInPage />);
      default:
        return(<div><button onClick={this.setEmilyT}>EmilyT</button><button onClick={this.setEmilyZ}>EmilyZ</button><button onClick={this.setMiranda}>Miranda</button></div>);
    } 
  }
 }