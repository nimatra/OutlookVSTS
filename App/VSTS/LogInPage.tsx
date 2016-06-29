import * as React from 'react';
import { Provider } from 'react-redux';
// import { Office } from 'Office';
import {Authenticate } from '../Authenticate/authenticate';
import { Store, createStore } from 'redux';
import {Settings } from './Settings';

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
    return (
      <div>
      <div> logo</div>
      <div><button onClick={this.auth} style = {style_button}>Sign In</button></div>
      <div> line separator</div>
      <div>
        <h1 style = {style_section}> Create work items</h1>
        <p  style = {style_text}> Do you have an email thread you need to make into a work item? Create work items directly from Outlook!</p>
      </div>
      <div>
        <h1 style = {style_section}> Communicate with your team</h1>
        <p style = {style_text}> After creating a work item, you can reply-all the thread with the item information or copy the information to the clipboard.</p>
      </div>
      <div>bottom image</div>
      <Settings />
      </div>
    );
  }
 }
