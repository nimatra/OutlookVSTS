/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
import {LogInPage } from '../LoginComponents/LogInPage';
import {AccountDropdown } from './AccountDropdown';
import {ProjectDropdown } from './ProjectDropdown';
import {AreaDropdown } from './AreaDropdown';
import {Users } from '../VSTS';
import {Auth, AuthState} from '../../auth';



export class Settings extends React.Component<{}, any> {

  public constructor() {
    super();
    this.state = {
        user : Users.Miranda,
        authState : AuthState.Authorized,
        returning: false
    };
    this.save = this.save.bind(this);
    console.log(this.state);
  }

  private save(): void{
    console.log('saving');
    this.setState({returning:true});
    console.log(this.state.returning);
    //TODO - save defaults to roaming settings
  }

  public render(): React.ReactElement<Provider> {
    var style_img = {
      align: 'center',
    };

    var style_text = {
       color: "rgb(118,118,118)", // dark gray
       font: "15px arial, sans-serif",
    };

    var style_button = {
      background: 'rgb(0,122,204)', // save button blue
      textalign: 'center',
      color: 'rgb(255,255,255)',
      font: "20px arial, sans-serif",
      align: 'center',
    };


    console.log('got to settings');
    console.log(this.state);


    if(this.state.returning === false){ //check if returning, Authorized, which page coming from
      return (
      <div>
          <div> <image src = './images/logo.png' style = {style_img}/></div>
          <div>
            <h1> Default Settings </h1>
            <p style = {style_text}> Assign default values for work item creation</p>
          </div>
          <div>
            <button style={style_button} onclick = {this.save}> Save </button>
          </div>
          <hr/>
          <div>
            <AccountDropdown />
            <ProjectDropdown />
            <AreaDropdown />
          </div>
      </div>
      );
  }
  }
 }