import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { AuthState, updateAuthAction } from '../../Redux/FlowActions';

interface ISignInProps {
    dispatch?: any;
    email?: string;
    authState?: AuthState;
}

function mapStateToProps(state: any): ISignInProps {
  console.log('state:' + JSON.stringify(state));

  return ({
      authState: state.IControlState.authState,
      email: state.IUserInfo.email,
    });
}

@connect(mapStateToProps)

export class SignInButton extends React.Component<ISignInProps,  {}> {

  public auth(): void {
    console.log('auth opened');
    window.open('./authenticate?user=' + this.props.email);
    this.props.dispatch(updateAuthAction(AuthState.Request));
  }

  public render(): React.ReactElement<Provider> {
    console.log('signinbutton');
    let style_button: any = {
      align: 'center',
      background: 'rgb(0,122,204)',
      font: '15px arial, ms-segoe-ui',
      textalign: 'center',
      textcolor: 'rgb(255,255,255)',
    };

    return(
      <div>
      <button className = 'ms-Button' onClick = {this.auth.bind(this)}> Sign in to get started </button>
      </div>);
  }
  }

