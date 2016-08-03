/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import {/*updateSettings, updateSettingsLists,*/  updateSettingsAndLists, ISettingsInfo} from '../../Redux/LoginActions';
import {Rest, Team } from '../../RestHelpers/rest';

// other import statements don't work properly
require('react-select/dist/react-select.css');
let Select: any = require('react-select');

interface ISettingsLocalProps {
  dispatch?: any;
  account?: string;
  project?: string;
}

interface IProjectProps {
  dispatch?: any;
  accounts?: ISettingsInfo[];
  id?: string;
  email?: string;
  settings?: ISettingsLocalProps;
  projects?: ISettingsInfo[];
}

function mapStateToProps(state: any): IProjectProps {
  return ({
    accounts: state.ICurrentLists.accountList,
    email: state.IUserInfo.email,
    id: state.IUserInfo.memberID,
    projects: state.ICurrentLists.projectList,
    settings: {
      account: state.ISettingsState.account,
      project: state.ISettingsState.project,
    },
  });
}

@connect(mapStateToProps)

export class ProjectDropdown extends React.Component<IProjectProps, any> {

  public onProjectSelect(option: any): void {
    let project: string = option.label;
    console.log('updated');
    console.log('selected:' + project);
    this.props.dispatch(updateSettings(this.props.settings.account, project, ''));
    this.populateTeams(project, this.props.settings.account);
  }

  public render(): React.ReactElement<Provider> {
    console.log('project drop');

    return (
        <Select
            name='form-field-name'
            options={this.props.projects}
            value={this.props.settings.project}
            onChange={this.onProjectSelect.bind(this)}
            />
    );
  }

    public populateTeams(project: string, account: string): void {
      console.log('getting team');
      console.log('accounts' + this.props.accounts);
      console.log('projs' + this.props.projects);
      Rest.getTeams(this.props.email, project, account, (teams: Team[]) => {
        let teamNames: ISettingsInfo[] = [];
        teams.forEach(team => {
          teamNames.push({label: team.name, value: team.name});
        });
        this.props.dispatch(updateSettingsLists(this.props.accounts, this.props.projects, teamNames)); // set store projectList
        console.log('teams:' + teamNames);
    });
  }

}
