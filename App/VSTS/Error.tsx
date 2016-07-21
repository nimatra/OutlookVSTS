import * as React from 'react';
import { Provider } from 'react-redux';

export interface errorState{
  isVisible : boolean,
  message: string
}

export class Error extends React.Component<errorState, {}> {

  public render(): React.ReactElement<Provider> {
    console.log("error");

    if(this.props.isVisible == true){
      return (<div> {this.props.message} </div>);
    }
  }
  }




