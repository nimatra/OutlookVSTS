import * as React from 'react';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
<<<<<<< 17b151eb4d8fc60b3c6239fcd02eafb5b85e92d6
import { Auth, AuthState } from '../auth';
import { Authenticate } from '../Authenticate/authenticate';
import { Settings } from './Settings';
=======
import {Settings } from './Settings';
>>>>>>> Update Settings to have dropdowns

export class LogInPage extends React.Component<{}, {authState: any, authToken:string, user: string, returning:boolean}> {
  //note: if auth expires, nav to azure.../done

  public constructor() {
    super();
    this.state = {
      authState: AuthState.Request, //AuthState.None
      authToken: '',
      user: '',
      returning: false //needs to be saved in store
    };

    var user = Office.context.mailbox.userProfile.emailAddress;

    Auth.getAuthState(user, (state:AuthState, token:string) =>{
      this.setState({
        user : user,
        authState : state,
        authToken : token,
        returning: false
      });
      console.log('state:' + this.state.authState);
  })
}
  private auth(): void{
    var user = Office.context.mailbox.userProfile.emailAddress;
    window.open('./authenticate?user=' + this.state.user);
  }

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

    //aadd to CSS folder for reuse
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

    var style_bottomlogo = {
      width:'500px',
      height:'120px',
      align: 'center',
    };

    console.log('got to login');
<<<<<<< 17b151eb4d8fc60b3c6239fcd02eafb5b85e92d6
    const state: AuthState = this.state.authState;
    const token: string = this.state.authToken;
    const user: string = this.state.user;

    console.log(AuthState);
    switch (state) {
      case AuthState.None: // We have to wait for Office to initialize, so show a waiting state
        return (<div>Loading</div>);
      case AuthState.Request: // Office has initialized, but we don't have auth for this user, show Log-In Page and pass them to the auth flow
        return (<div>
      <div><image src = './images/logo.png' style = {style_img}/></div>
=======
    return (
      <div>
      <div> logo</div>
>>>>>>> Update Settings to have dropdowns
      <div><button onClick={this.auth} style = {style_button}>Sign In</button></div>
      <hr/>
      <div>
        <h1 style = {style_section}> Create work items</h1>
        <p  style = {style_text}> Do you have an email thread you need to make into a work item? Create work items directly from Outlook!</p>
      </div>
      <div>
        <h1 style = {style_section}> Communicate with your team</h1>
        <p style = {style_text}> After creating a work item, you can reply-all the thread with the item information or copy the information to the clipboard.</p>
      </div>
<<<<<<< 17b151eb4d8fc60b3c6239fcd02eafb5b85e92d6
=======
      <div>bottom image</div>
      <Settings />
>>>>>>> Update Settings to have dropdowns
      </div>
    );
      case AuthState.Authorized: // We have auth for this user, determine whether to show settings or straight to creation
      { if(this.state.returning == false){
          console.log(this.state.returning)
          this.state.returning = true; //don't want to automatically re-render, just save for next time - need to save in store
          console.log(this.state.returning)
          return (<Settings />);
        }
        else
          return (<div>Create Item </div>);
      }
  }

 }
}
