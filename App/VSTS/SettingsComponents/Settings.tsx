/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
import {LogInPage } from '../LoginComponents/LogInPage';
import {Users } from '../VSTS';
import {Auth, AuthState} from '../../auth';
import { SelectField } from './SelectField';

export class Settings extends React.Component<{}, any> {

  public constructor() {
    super();
    this.state = {
        user : Users.Miranda,
        authState : AuthState.Authorized,
        returning: false,
        name : "Miranda"
    };
    this.save = this.save.bind(this);
    console.log(this.state);
  }

  private save(): void{
    console.log('saving');
    this.setState({returning:true});
    console.log(this.state.returning);

  }

  public changed(): void{
    console.log('updated');
  }

  style_text = {
       color: "rgb(63,63,63)", // dark gray
       font: "15px arial, ms-segoe-ui",
    };

  style_label = {
       color: "rgb(107,107,107)", // dark gray
       font: "15px arial, ms-segoe-ui",
    };

  style_button = { //not added for
      background: 'rgb(255,255,255)',
      textalign: 'right',
      color: 'rgb(0,63,204)',
      font: "15px arial, ms-segoe-ui",
      align: 'right',
    };

  public render(): React.ReactElement<Provider> {
    console.log('got to settings');
    console.log(this.state);

    const accounts: string[] = ["o365exchange","outlook","mseng"];
    const projects: string[] = ["Outlook Services", "Outlook Desktop"];
    const area: string[] = ["VSTS","Yelp","Display Dialog"];
    //check if returning, Authorized, which page coming from
      return (
      <div>
          <div>
            <p style = {this.style_text}> Welcome {this.state.name}!</p>
            <p/>
            <p style = {this.style_text}> Take a moment to configure your default settings for work item creation. </p>
          </div>
          <div>
          <label style = {this.style_label}> Account </label>
          <SelectField options = {accounts} onChange = {this.changed} />
          <label style = {this.style_label}> Project </label>
          <SelectField options = {projects} onChange = {this.changed} />
          <label style = {this.style_label}> Area </label>
          <SelectField options = {area} onChange = {this.changed} />
          </div>

          <button className = 'ms-Button' onClick = {this.save}>
            <span className= 'ms-Icon ms-Icon--save' > Save and continue </span>
          </button>

      </div>
      );
  }
  }


 /*<div>
            <SettingsForm onSubmit={(formValues)=>{console.log(formValues)}}/>
</div>*/