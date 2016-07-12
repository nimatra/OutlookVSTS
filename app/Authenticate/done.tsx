/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';

export class Done extends React.Component<{}, {}> {

  public render(): React.ReactElement<Provider> {
    return (<div>
                <h2>All Set!</h2>
                <h3>Close this window and enjoy!</h3>
                <button onClick={window.close}>Close</button>
            </div>);
  }
 }
