import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { AuthStateEnum, updateAuth } from '../../Redux/FlowActions';

interface ICombo {
    dispatch?: any;
    email?: string;
    authState?: AuthStateEnum;
}

function mapStateToProps(state: any): ICombo {
  console.log('state:' + JSON.stringify(state));

  return ({
      authState: state.IControlState.authState,
      email: state.IUserInfo.email,
    });
}

@connect(mapStateToProps)

export class SignInButton extends React.Component<ICombo,  {}> {

  style_button = {
      background: 'rgb(0,122,204)',
      textalign: 'center',
      color: 'rgb(255,255,255)',
      font: '15px arial, //ms-segoe-ui',
      align: 'center',
    };

  public auth(): void {
    console.log('auth opened');
    window.open('./authenticate?user=' + this.props.email);
    this.props.dispatch(updateAuth(AuthStateEnum.Request));
  }

  public render(): React.ReactElement<Provider> {
    console.log('signinbutton');
    return(
      <div>
      <button className = 'ms-Button' style = {this.style_button} onClick = {this.auth.bind(this)}> Sign in to get started </button>
      </div>);
  }
  }

