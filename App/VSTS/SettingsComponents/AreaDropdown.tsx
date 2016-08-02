/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import {updateSettings, ISettingsInfo} from '../../Redux/LoginActions';

require('react-select/dist/react-select.css');
let Select: any = require('react-select');

interface ISettingsLocal {
  dispatch?: any;
  account?: string;
  project?: string;
  area?: string;
}

interface ICombo {
  dispatch?: any;
  id?: string;
  email?: string;
  settings?: ISettingsLocal;
  teams?: ISettingsInfo[];
}

function mapStateToProps(state: any): ICombo {
  return ({
    email: state.IUserInfo.email,
    id: state.IUserInfo.memberID,
    settings: {
      account: state.ISettingsState.account,
      area: state.ISettingsState.team,
      project: state.ISettingsState.project,
    },
    teams: state.ICurrentLists.teamList,
  });
}

@connect(mapStateToProps)

export class AreaDropdown extends React.Component<ICombo, any> {

  public onTeamSelect(option): void {
    let team: string = option.label;
    console.log('updated');
    console.log('selected:' + team);
    this.props.dispatch(updateSettings(this.props.settings.account, this.props.settings.project, team));
  }

  public render(): React.ReactElement<Provider> {
    console.log('area drop');

    return (
        <Select
            name='form-field-name'
            options={this.props.teams}
            value={this.props.settings.area}
            onChange={this.onTeamSelect.bind(this)}
            />
    );
  }
}