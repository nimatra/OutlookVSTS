/// <reference path="../../office.d.ts" />
import * as React from 'react';

/**
 * Props for CopyButton Component
 * @interface { ICopyButtonProps }
 */
interface ICopyButtonProps {
  /**
   * workItemHyperlink
   * @type { string }
   */
  workItemHyperlink: string;
}

/**
 * Renders a button that writes an HTML element to clipboard on-click
 * @class { CopyButton }
 */
export class CopyButton extends React.Component<ICopyButtonProps, {}> {
  /**
   * Renders the CopyButton Component and reads ICopyButtonProps
   * Returns ReactHTML 
   */
  public render(): React.ReactElement<{}> {
    console.log('got to copybutton');
    document.addEventListener('copy', this.setClipboardData);
    return (
      <div>
        <button className='ms-Button' onClick={this.handleClick}>
          <a className='ms-Icon ms-Icon--copy'/>
          {'   '}Copy to Clipboard
        </button>
        <br/><br/>
      </div>
    );
  }

  /**
   * Handles the button click and fires a copy command
   * @private
   */
  private handleClick: () => void = () => {
    document.execCommand('copy');
  }

  /**
   * Writes the formatted HTML element to the clipboard
   * @private
   * @oaran { any } e 
   */
  private setClipboardData: (e: any) => void = (e) => {
    console.log('got to handler');
    e.clipboardData.setData('text/html', this.props.workItemHyperlink);
    e.preventDefault(); // we want our data, not data from any selection, to be written to the clipboard
  }
 }
