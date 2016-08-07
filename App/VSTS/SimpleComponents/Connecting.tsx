import * as React from 'react';
import { Provider } from 'react-redux';

/**
 * Dumb component
 * Renders connecting page
 * @class {Connecting} 
 */
export class Connecting extends React.Component<{}, {}> {

  /**
   * Renders Connecting page
   */
  public render(): React.ReactElement<Provider> {
      return (<div>
      Connecting...
      </div>);
    }
  }




