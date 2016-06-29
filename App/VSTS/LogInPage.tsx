import * as React from 'react';
import { Provider } from 'react-redux';
// import { Office } from 'Office';

export class LogInPage extends React.Component<{}, {}> {

  public auth(): void{

    window.open('./authenticate?user=' + Office.context.mailbox.userProfile.emailAddress);
  }

  public render(): React.ReactElement<Provider> {
    var style_img = {
      align: 'center'
    };

    var style_button = {
      backgroundcolor: 'rgb(0,122,204)', // save button blue
      textalign: 'center',
      textcolor: 'rgb(255,255,255)',
      font: "Arial, sans-serif, 12px",
      align: 'center'
    };

    var style_section = {
      color: 'rgb(104,33,122)', // the VS purple
      font: "Arial, sans-serif, 12px"
    };

    var style_signin = {
       color: 'rgb(104,33,122)', // the VS purple
       font: "Arial, sans-serif, 12px"

    };

    var style_text1 = {
       color: "rgb(30,30,30)", // black
       font: "Arial, sans-serif, 12px"

    };

    var style_text2 = {
      color: 'rgb(157,157,157)' // dark gray
      // font: "Arial, sans-serif, 12px"
    };

    var style_bottomlogo = {
      width:'500px',
      height:'120px',
      align: 'center'
    };

    console.log('got to vsts');
    return (
      <div>
      <div> logo</div>
      <div><button onClick={this.auth} style = {style_button}>Sign In</button></div>
      <div> line separator</div>
      <div>
        <h1> Create work items</h1>
        <p> Do you have an email thread you need to make into a work item? Create work items directly from Outlook!</p>
      </div>
      <div>
        <h2> Communicate with your team</h2>
        <p> After creating a work item, you can reply-all the thread with the item information or copy the information to the clipboard.</p>
      </div>
      <div>bottom image</div>
      </div>
    );
  }
 }
