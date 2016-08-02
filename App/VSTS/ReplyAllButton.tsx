/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
// import { Office } from 'Office';

// let finalLink: React.ReactElement<any> = (<ItemHyperlink />);

export class ReplyAllButton extends React.Component<{workItemHyperlink: any}, {}> {

  public render(): React.ReactElement<Provider> {
    console.log('got to replyallbutton');

    return (
      <div>
        <button onClick={this.handleClick} className='ms-Button'>
        <span className='ms-Icon ms-Icon--replyAll'></span>
        {'   '}Reply All with Work Item
        </button>
        <h1></h1>
      </div>
    );
  }

  /**
   * handles mouse click on a suggestion
   * 
   * this is an anonymous method - actually, it is a variable
   * 
   * @private
   */

  private handleClick: any = (event) => {
    Office.context.mailbox.item.displayReplyAllForm(this.props.workItemHyperlink);
  }
}
