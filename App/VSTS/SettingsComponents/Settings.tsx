/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import {Error } from '../Error';
import {AccountDropdown } from './AccountDropdown';
import {ProjectDropdown } from './ProjectDropdown';
import {AreaDropdown } from './AreaDropdown';
import {PageVisibilityEnum, updatePage, showError} from '../../Redux/FlowActions';

interface ISettingsLocal {
  dispatch?: any;
  account?: string;
  project?: string;
  team?: string;
}

interface ICombo {
  dispatch?: any;
  settings?: ISettingsLocal;
  name?: string;
  pageState?: PageVisibilityEnum;
}

function mapStateToProps(state: any): ICombo {
  console.log('state:' + JSON.stringify(state));
  return ({
    name: state.IUserInfo.displayName,
    pageState: state.IControlState.pageState,
    settings: {
      account: state.ISettingsState.account,
      project: state.ISettingsState.project,
      team: state.ISettingsState.team,
    },
    });
}

@connect(mapStateToProps)

export class Settings extends React.Component<ICombo, any> {

  public save(): void {
    // save defaults to roaming settings
    Office.context.roamingSettings.set('default_account', this.props.settings.account);
    Office.context.roamingSettings.set('default_project', this.props.settings.project);
    Office.context.roamingSettings.set('default_team', this.props.settings.team);
    Office.context.roamingSettings.saveAsync();
    console.log('persisted:' + Office.context.roamingSettings.get('default_account'));

    this.props.dispatch(updatePage(PageVisibilityEnum.CreateItem));
  }

  public render(): React.ReactElement<Provider> {
    console.log('got to settings');

    return (
      <div>
        <Error />
        <div>
          <p style = {this.style_text}> Welcome {this.props.name}!</p>
          <p/>
          <p style = {this.style_text}> Take a moment to configure your default settings for work item creation.</p>
        </div>
        <div>
          <label style = {this.style_label}> Account </label>
          <AccountDropdown />
          <label style = {this.style_label}> Project </label>
          <ProjectDropdown />
          <label style = {this.style_label}> Area </label>
          <AreaDropdown />
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

  style_button = { // not added for
    background: 'rgb(255,255,255)',
    textalign: 'right',
    color: 'rgb(0,63,204)',
    font: '15px arial, ms-segoe-ui',
    align: 'right',
  };
}
