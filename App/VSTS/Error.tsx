import * as React from 'react';
import { Provider, connect } from 'react-redux';

export interface errorState{
  dispatch?:any;
  isVisible?: boolean;
  message?: string;
}

function mapStateToProps(state: any): errorState {
  // state of type in any
  console.log('state:' + JSON.stringify(state));

  return (
      {
      isVisible:state.IControlState.error.isVisible,
      message:state.IControlState.error.message,
    });
}

@connect(mapStateToProps)

export class Error extends React.Component<errorState, {}> {

  public render(): React.ReactElement<Provider> {
    if (this.props.isVisible === true) {
      console.log('error');
      return (<div> {this.props.message} </div>);
    }
    else {
      return (<div/>);
    }
  }
  }




