import * as React from 'react';
import { Provider } from 'react-redux';


export class Loading extends React.Component<{}, {}> {

  public render(): React.ReactElement<Provider> {
      return (<div>
      Loading...
      </div>);
    }
  }




