import * as React from 'react';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
import { Auth, AuthState } from '../auth';
import { Authenticate } from '../Authenticate/authenticate';
import { Settings } from './Settings';

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

  public auth(): void{

    window.open('./authenticate?user=' + Office.context.mailbox.userProfile.emailAddress);
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
