import * as React from 'react';
import { Provider } from 'react-redux';

export class AddInDescription extends React.Component<{}, {}> {
  //note: if auth expires, nav to azure.../done

  public constructor() {
    super();
    console.log("addindescription");
  }

  style_section = {
      //update to use VSTS blue, Segoe UI Semibold
      color: 'rgb(0,122,204)',
      font: "20px arial, ms-segoe-ui-semibold",
    };

    style_text = {
       color: "rgb(63,63,63)", // dark gray
       font: "15px arial, ms-segoe-ui",
    };


  public render(): React.ReactElement<Provider> {
    var style_img = {
      align: 'center',
    };

  // Office has initialized, but we don't have auth for this user, show Log-In Page and pass them to the auth flow
    return(<div>
      <div>image</div>
      <div>
        <h1 style = {this.style_section}> Create work items</h1>
        <p  style = {this.style_text}>Turn an email thread into a work item directly from Outlook!</p>
      </div>
      <div>
        <h1 style = {this.style_section}> Communicate with your team </h1>
        <p style = {this.style_text}> Once the work item is created, use the reply-all feature to close the thread with a link and details to the work item. </p>
      </div>
      </div>
    );
  }
  }

//<image src = './images/logo.png' style = {style_img}/>


