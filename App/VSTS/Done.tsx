/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
//setting page
export class Done extends React.Component<{}, {}> {

  public render(): React.ReactElement<Provider> {
    var style_img = {
      align: 'center'
    };

    var style_button = {
      backgroundcolor: 'rgb(0,122,204)', //save button blue
      textalign: 'center',
      textcolor: 'rgb(255,255,255)',
      font: "Arial, sans-serif, 12px",
      align: 'center'
    };

    var style_section = {
      color: 'rgb(104,33,122)', //VS purple
      font: "Arial, sans-serif, 12px"
    };

    var style_signin = {
       color: 'rgb(104,33,122)', //VS purple
       font: "Arial, sans-serif, 12px"

    };

    var style_text1 = {
       color: "rgb(30,30,30)", //black
       font: "Arial, sans-serif, 12px"

    };

    var style_text2 = {
      color: 'rgb(157,157,157)' //dark gray
      //font: "Arial, sans-serif, 12px"
    };

    var style_bottomlogo = {
      width:'500px',
      height:'120px',
      align: 'center'
    };

    console.log('got to vsts');
    return (
      <div>
      <div>
            <img src='./logo.png' alt="VSLogo" style = {style_img}/>
            </div>
            <div>
              <a href="https://azure.localtest.me:3000/authenticate" style = {style_signin}>Sign in</a>
            </div>
            <div>
              <h1 style = {style_section}> Create work items </h1>
              <p style = {style_text2}> Do you have an email thread that should be turned into a work item or has your boss sent you a list of things to do? Create work items directly from your email.</p>
              <h2 style = {style_section}>Respond to comments</h2>
              <p style = {style_text2}> When you are mentioned in a comment thread, post a reply without clicking away from the email notification.</p>
              <h3 style = {style_section}>View details of a work item</h3>
              <p style = {style_text2}> If a work item number is present in the email body, details will be displayed in the adjacent task pane.</p>
          </div>
          <img src="./logo_strip.png" alt="VSOLogo" style={style_bottomlogo}/>
          </div>
          );
  }
 }