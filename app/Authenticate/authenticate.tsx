/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
import { Auth, AuthState } from '../auth';
interface IRefreshCallback { (): void; }

interface IAuthenticateProps {
  user: string;
  pollInterval: number;
  refresh: IRefreshCallback;
}

export class Authenticate extends React.Component<IAuthenticateProps, {}> {

  private authKey: any;

  public constructor() {
    super();
    this.linkToAuth = this.linkToAuth.bind(this);
    this.refreshAuth = this.refreshAuth.bind(this);
  }

  public linkToAuth(): void {
    window.open('./authenticate?user=' + this.props.user);
  }


  public refreshAuth(): void {
    let refresh: IRefreshCallback = this.props.refresh;
    let authKey: any = this.authKey;
    Auth.getAuthState(this.props.user, function (state: AuthState): void {
      if (state === AuthState.Authorized) {
        refresh();
        clearInterval(authKey);
      }
    });
  }

  public componentDidMount(): void {
    this.authKey = setInterval(this.refreshAuth, this.props.pollInterval);
  }


  public render(): React.ReactElement<Provider> {
    const user: string = this.props.user;
    return (<div>
      <h2>First you need to authorize us to access your information: {user}</h2>
      <button onClick={this.linkToAuth}>Authorize</button>
    </div>);
  }
}
