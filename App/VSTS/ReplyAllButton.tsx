/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';

/**
 * Props for ReplyAllButton Component
 * @interface { IReplyAllButtonProps }
 */
interface IReplyAllButtonProps {
  /**
   * workItemHyperlink
   * @type { string }
   */
  workItemHyperlink: string;
}

/**
 * Renders a button that on-click, opens a reply-all form with the item hyperlink inserted in-line
 * @class { ReplyAllButton }
 */
export class ReplyAllButton extends React.Component<IReplyAllButtonProps, {}> {
  /**
   * Renders the ReplyAllButton Component and reads IReplyAllButtonProps
   * @returns { React.ReactElement } ReactHTML div
   */
  public render(): React.ReactElement<Provider> {
    return (
      <div>
        <button onClick={this.handleClick} className='ms-Button'>
          <a className='ms-Icon ms-Icon--replyAll' />
          {'   '}Reply All with Work Item
        </button>
        <br/><br/>
      </div>
    );
  }

  /**
   * Handles the click and displays a reply-all form
   * @private
   */
  private handleClick: () => void = () => {
    Office.context.mailbox.item.displayReplyAllForm(this.props.workItemHyperlink);
  }
}
