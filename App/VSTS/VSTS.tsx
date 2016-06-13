import * as React from 'react';
import { Provider } from 'react-redux';

export class VSTS extends React.Component<{}, {}> {
  public render(): React.ReactElement<Provider> {
    console.log('got to vsts');
    return (<div>
              <h1>Dogfood</h1>
            </div>);
  }
 }