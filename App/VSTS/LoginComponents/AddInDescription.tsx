import * as React from 'react';
import { Provider } from 'react-redux';

/**
 * Dumb component
 * Renders the static add-in description text
 * @class {AddInDescription} 
 */
export class AddInDescription extends React.Component<{}, {}> {

  /**
   * Renders the add-in description text
   */
  public render(): React.ReactElement<Provider> {
    let style_section: any = {
      color: 'rgb(0,122,204)',
      font: '20px arial, ms-segoe-ui-semibold',
    };

    let style_text: any = {
       color: 'rgb(63,63,63)',
       font: '15px arial, ms-segoe-ui',
    };

    return(<div>
      <div></div>
      <div>
        <h1 style = {style_section}> Create work items</h1>
        <p  style = {style_text}>Turn an email thread into a work item directly from Outlook!</p>
      </div>
      <div>
        <h1 style = {style_section}> Communicate with your team </h1>
        <p style = {style_text}> Once the work item is created,
        use the reply-all feature to close the thread with a link and details to the work item. </p>
      </div>
      </div>
    );
  }
  }


