import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { Store, createStore } from 'redux';
import { Auth } from '../../auth';
import { Authenticate } from '../../Authenticate/authenticate';
import { AuthStateEnum, updateAuth } from '../../Redux/FlowActions';

interface combo{
    dispatch?:any;
    email?: string;
    authState?: AuthStateEnum;
}

function mapStateToProps(state: any): combo {
  // state of type in any
  console.log('state:' + JSON.stringify(state));

  return ({
      email:state.IUserInfo.email,
      authState:state.IControlState.authState
    });
}

@connect(mapStateToProps)

export class SignInButton extends React.Component<combo,  {}> {
  //note: if auth expires, nav to azure.../done

  constructor (){
    super();
    this.auth = this.auth.bind(this);
  }
  style_button = {
      background: 'rgb(0,122,204)', // save button blue
      textalign: 'center',
      color: 'rgb(255,255,255)',
      font: "15px arial, //ms-segoe-ui",
      align: 'center',
    };

  public auth(): void{
    console.log("auth opened");
    window.open('./authenticate?user=' + this.props.email);
    //update authState to Connecting
    this.props.dispatch(updateAuth(AuthStateEnum.Request));
  }

  public render(): React.ReactElement<Provider> {
    console.log('signinbutton');
    return(
      <div>
      <button className = 'ms-Button' style = {this.style_button} onClick = {this.auth}> Sign in to get started </button>
      </div>);
  }
  }

