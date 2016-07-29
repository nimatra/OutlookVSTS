/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
//import {Users } from '../VSTS';
import {Auth} from '../../auth';
import {Error } from '../Error';
import {ISettingsState} from '../../Redux/LogInReducer';
import {updateSettings, ISettings} from '../../Redux/LoginActions';
import {AccountDropdown } from './AccountDropdown'
import { Rest, Account, Project, Team } from '../../RestHelpers/rest';
import {SettingsOptions} from './SettingsOptions';
//other import statements don't work properly
require('react-select/dist/react-select.css');
let Select = require('react-select');

interface settingsLocal {
  dispatch?: any;
  account?: string;
  project?: string;
  team?: string;
}

interface combo {
  dispatch?: any;
  settings?: settingsLocal;
  name?:string;
}

function mapStateToProps(state: any): combo {
  // state of type in any
  console.log('state:' + JSON.stringify(state));
  return ({
    settings:{
      account: state.ISettingsState.account,
      project: state.ISettingsState.project,
      team: state.ISettingsState.team,
    },
    name: state.IUserInfo.displayName});
    //add pagestate
}

@connect(mapStateToProps)

export class Settings extends React.Component<combo, any> {

  private save(): void {
    // save defaults to roaming settings
    Office.context.roamingSettings.set('default_account', this.props.settings.account);
    Office.context.roamingSettings.set('default_project', this.props.settings.project);
    Office.context.roamingSettings.set('default_team', this.props.settings.team);
    Office.context.roamingSettings.saveAsync();
    console.log("persisted:"+Office.context.roamingSettings.get('default_account'));
    //TODO - update page state
  }

  public render(): React.ReactElement<Provider> {
    console.log('got to settings');
    console.log('props:' + this.props);

    //check if returning, Authorized, which page coming from
    return (
      <div>
        <Error />
        <div>
          <p style = {this.style_text}> Welcome {this.props.name}!</p>
          <p/>
          <p style = {this.style_text}> Take a moment to configure your default settings for work item creation.</p>
        </div>
        <div>
          <SettingsOptions />
        </div>
        <div>
          <button className = 'ms-Button' onClick = {this.save.bind(this)}>
            <span className= 'ms-Icon ms-Icon--save' > Save and continue </span>
          </button>
        </div>
      </div>
    );
  }

  style_text = {
    color: 'rgb(63,63,63)', // dark gray
    font: '15px arial, ms-segoe-ui',
  };

  style_label = {
    color: 'rgb(107,107,107)', // dark gray
    font: '15px arial, ms-segoe-ui',
  };

  style_button = { //not added for
    background: 'rgb(255,255,255)',
    textalign: 'right',
    color: 'rgb(0,63,204)',
    font: '15px arial, ms-segoe-ui',
    align: 'right',
  };
}