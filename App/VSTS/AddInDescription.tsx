import * as React from 'react';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
import { Auth, AuthState } from '../auth';
import { Authenticate } from '../Authenticate/authenticate';
import { Settings } from './Settings';

export class AddInDescription extends React.Component<{}, {authState: AuthState, authToken:string, user: string}> {
  //note: if auth expires, nav to azure.../done

  public constructor() {
    super();
    console.log('got to addindescr');
    var user =
    Auth.getAuthState(user, (state:AuthState, token:string) =>{
      this.setState({
        user : user,
        authState : state,
        authToken : token
      });
    })
  }

  private auth(): void{
    var user = Office.context.mailbox.userProfile.emailAddress;
    //console.log(this.state.user);
    window.open('./authenticate?user=' + user);
  }

  public render(): React.ReactElement<Provider> {

    //add to CSS folder for reuse
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
    //switch(this.state.authState){
    //case AuthState.Request: // Office has initialized, but we don't have auth for this user, show Log-In Page and pass them to the auth flow
      return(<div>
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
    //default:
      //return(<div/>);
  }
  }
 //}

