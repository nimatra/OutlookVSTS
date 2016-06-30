import * as React from 'react';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
<<<<<<< 59bdb0c517d058dc8b0b6fc84db116cfecb24dc3
<<<<<<< 76a05fdccfc12bcbc2b4774a2868dc3179e5c179
=======
>>>>>>> Update Settings to have dropdowns
import {Settings } from './Settings';

export class LogInPage extends React.Component<{}, {}> {

<<<<<<< 59bdb0c517d058dc8b0b6fc84db116cfecb24dc3
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
=======

export class LogInPage extends React.Component<{}, {isReady : boolean}> {
>>>>>>> LogInPage correctly calls auth. Settings has basic buttons/headings/dropdowns

  //Work around for Office slow to initialize w/ error:
  //Office.js:12 Uncaught Office.js has not been fully loaded yet. Please try again later or make sure to add your initialization code on the Office.initialize function.
=======
>>>>>>> Update Settings to have dropdowns
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
  }

  public render(): React.ReactElement<Provider> {
    if(this.isReady == false)
    {
      return(<div>loading...</div>);
    }

    //add CSS in folder for reuse in other properties
    var style_img = {
      align: 'center',
    };

    var style_button = {
      background: 'rgb(0,122,204)', // save button blue
      textalign: 'center',
<<<<<<< 59bdb0c517d058dc8b0b6fc84db116cfecb24dc3
<<<<<<< 76a05fdccfc12bcbc2b4774a2868dc3179e5c179
      color: 'rgb(255,255,255)',
=======
      textcolor: 'rgb(255,255,255)',
>>>>>>> LogInPage correctly calls auth. Settings has basic buttons/headings/dropdowns
=======
      color: 'rgb(255,255,255)',
>>>>>>> Update Settings to have dropdowns
      font: "20px arial, sans-serif",
      align: 'center',
    };

    var style_section = {
      color: 'rgb(104,33,122)', // the VS purple
      font: "20px arial, sans-serif",
    };

    var style_text = {
       color: "rgb(118,118,118)", // TODO - change to dark gray
       font: "15px arial, sans-serif",
    };

    var style_bottomlogo = {
      width:'500px',
      height:'120px',
      align: 'center',
    };


    console.log('got to login');
    return (
      <div>
      <div><image src = './images/logo.png' style = {style_img}/></div>
      <div><button onClick={this.auth} style = {style_button}>Sign In</button></div>
      <hr/>
      <div>
<<<<<<< 76a05fdccfc12bcbc2b4774a2868dc3179e5c179
<<<<<<< 477403f46d0856b72806b564bafaf1d58079253f
        <h1 style = {style_section}> Create work items</h1>
        <p  style = {style_text}> Do you have an email thread you need to make into a work item? Create work items directly from Outlook!</p>
      </div>
      <div>
        <h1 style = {style_section}> Communicate with your team</h1>
        <p style = {style_text}> After creating a work item, you can reply-all the thread with the item information or copy the information to the clipboard.</p>
      </div>
      <div>bottom image</div>
      <Settings />
=======
        <h1> Create work items</h1>
        <p> Do you have an email thread you need to make into a work item? Create work items directly from Outlook!</p>
=======
        <h1 style = {style_section}> Create work items</h1>
        <p  style = {style_text}> Do you have an email thread you need to make into a work item? Create work items directly from Outlook!</p>
>>>>>>> LogInPage correctly calls auth. Settings has basic buttons/headings/dropdowns
      </div>
      <div>
        <h1 style = {style_section}> Communicate with your team</h1>
        <p style = {style_text}> After creating a work item, you can reply-all the thread with the item information or copy the information to the clipboard.</p>
      </div>
<<<<<<< 4c58302a74285df54e2354974068e477efe409f2
      <div>bottom image</div>
<<<<<<< 59bdb0c517d058dc8b0b6fc84db116cfecb24dc3
>>>>>>> Added paragraphs and button direct to authenticate to LogInPage
=======
=======
      <div><image src = './images/logo_strip.png' style = {style_bottomlogo}/> </div>
>>>>>>> Added images to UI Mockups
      <Settings />
>>>>>>> Update Settings to have dropdowns
      </div>
    );
  }
 }
