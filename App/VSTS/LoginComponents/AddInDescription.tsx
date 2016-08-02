import * as React from 'react';
import { Provider } from 'react-redux';

export class AddInDescription extends React.Component<{}, {}> {

  style_section = {
      color: 'rgb(0,122,204)',
      font: '20px arial, ms-segoe-ui-semibold',
    };

    style_text = {
       color: 'rgb(63,63,63)',
       font: '15px arial, ms-segoe-ui',
    };


  public render(): React.ReactElement<Provider> {
    console.log('addindescription');
    let style_img = {
      align: 'center',
    };

    return(<div>
      <div></div>
      <div>
        <h1 style = {this.style_section}> Create work items</h1>
        <p  style = {this.style_text}>Turn an email thread into a work item directly from Outlook!</p>
      </div>
      <div>
        <h1 style = {this.style_section}> Communicate with your team </h1>
        <p style = {this.style_text}> Once the work item is created,
        use the reply-all feature to close the thread with a link and details to the work item. </p>
      </div>
      </div>
    );
  }
  }

//<image src = './images/logo.png' style = {style_img}/>


