import * as React from 'react';
import { Provider, connect } from 'react-redux';

/**
 * Properties needed for the Error component
 * @interface IErrorProps
 */
export interface IErrorProps {
  dispatch?: any;
  isVisible?: boolean;
  message?: string;
}

/**
 * maps state in application store to properties for the component
 * @param {any} state
 */
function mapStateToProps(state: any): IErrorProps {
  return (
      {
      isVisible: state.controlState.error.isVisible,
      message: state.controlState.error.message,
    });
}

@connect(mapStateToProps)

/**
 * Smart component
 * Renders error response
 * @class {Error} 
 */
export class Error extends React.Component<IErrorProps, {}> {
  /**
   * Renders the error message in parent component
   */
  public render(): React.ReactElement<Provider> {
    if (this.props.isVisible === true) {
      console.log('error');
      return (<div> {this.props.message} </div>);
    }else {
      return (<div/>);
    }
  }
}




