/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import {updateSettingsAndLists, ISettingsInfo} from '../../Redux/LoginActions';

require('react-select/dist/react-select.css');
let Select: any = require('react-select');

interface ILocalSettingsProps {
  dispatch?: any;
  account?: string;
  project?: string;
  area?: string;
}

interface IAreaProps {
  id?: string;
  email?: string;
  settings?: ILocalSettingsProps;
  teams?: ISettingsInfo[];
}

function mapStateToProps(state: any): IAreaProps {
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

export class AreaDropdown extends React.Component<IAreaProps, any> {

  public onTeamSelect(option: any): void {
    let team: string = option.label;
    console.log('updated');
    console.log('selected:' + team);
    //this.props.dispatch(updateSettingsAndLists(this.props.settings.account, this.props.settings.project, team));
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
