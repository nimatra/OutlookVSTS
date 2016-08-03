/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import {Error } from '../SimpleComponents/Error';
import {AccountDropdown } from './AccountDropdown';
import {ProjectDropdown } from './ProjectDropdown';
import {AreaDropdown } from './AreaDropdown';
import {PageVisibilityEnum, updatePage} from '../../Redux/FlowActions';

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
    let style_text: any = {
      color: 'rgb(63,63,63)', // dark gray
      font: '15px arial, ms-segoe-ui',
    };

    let style_label: any = {
      color: 'rgb(107,107,107)', // dark gray
      font: '15px arial, ms-segoe-ui',
    };

    let style_button: any = { // not added for
      align: 'right',
      background: 'rgb(255,255,255)',
      color: 'rgb(0,63,204)',
      font: '15px arial, ms-segoe-ui',
      textalign: 'right',
    };

    return (
      <div>
        <Error />
        <div>
          <p style = {style_text}> Welcome {this.props.name}!</p>
          <p/>
          <p style = {style_text}> Take a moment to configure your default settings for work item creation.</p>
        </div>
        <div>
          <label style = {style_label}> Account </label>
          <AccountDropdown />
          <label style = {style_label}> Project </label>
          <ProjectDropdown />
          <label style = {style_label}> Area </label>
          <AreaDropdown />
        </div>
        <div>
          <button className = 'ms-Button' style = {style_button} onClick = {this.save.bind(this)}>
            <span className= 'ms-Icon ms-Icon--save' > Save and continue </span>
          </button>
        </div>
      </div>
    );
  }
}
