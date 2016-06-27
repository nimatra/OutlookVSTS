/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';

export class Authenticate extends React.Component<{user}, {}> {

  public constructor(){
      super();
      this.linkToAuth = this.linkToAuth.bind(this);
  }

  public linkToAuth():void{
    window.open('./authenticate?user=' + this.props.user);
  }

  public render(): React.ReactElement<Provider> {
    return (<div>
                <h2>First you need to authorize us to access your information</h2>
                <button onClick={this.linkToAuth}>Authorize</button>
            </div>);
  }
 }