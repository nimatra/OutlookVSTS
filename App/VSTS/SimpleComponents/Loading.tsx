import * as React from 'react';
import { Provider } from 'react-redux';

/**
 * Dumb component
 * Renders loading page
 * @class {loading} 
 */
export class Loading extends React.Component<{}, {}> {
  /**
   * Renders Loading page
   */
  public render(): React.ReactElement<Provider> {
      return (<div>
      Loading...
      </div>);
    }
  }




