/// <reference path="../../office.d.ts" />
import * as React from 'react';


interface ICopyButtonProps {
  workItemHyperlink: string;
}

export class CopyButton extends React.Component<ICopyButtonProps, {}> {

  public render(): React.ReactElement<{}> {
    console.log('got to copybutton');
    document.addEventListener('copy', this.setClipboardHandler);

    return (
      <div>
      <button className='ms-Button' onClick={this.handleClick}>
      <span className='ms-Icon ms-Icon--copy'></span>
      {'   '}Copy to Clipboard
      </button>
      <h1></h1>
      </div>
    );
  }

  private handleClick: any = (event) => {
    document.execCommand('copy');
  }

  private setClipboardHandler: any = (e: any) => {
    console.log('got to handler');
    e.clipboardData.setData('text/html', this.props.workItemHyperlink);
    e.preventDefault(); // we want our data, not data from any selection, to be written to the clipboard
  }
 }
