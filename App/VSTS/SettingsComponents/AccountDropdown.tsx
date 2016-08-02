/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import {updateSettings, updateSettingsLists, ISettingsInfo} from '../../Redux/LoginActions';
import {Rest, Project } from '../../RestHelpers/rest';

// other import statements don't work properly
require('react-select/dist/react-select.css');
let Select: any = require('react-select');

interface ICombo {
  dispatch?: any;
  id?: string;
  email?: string;
  account?: string;
  accounts?: ISettingsInfo[];
}

function mapStateToProps(state: any): ICombo {
  return ({
    account: state.ISettingsState.account,
    accounts: state.ICurrentLists.accountList,
    email: state.IUserInfo.email,
    id: state.IUserInfo.memberID,
    });
}

@connect(mapStateToProps)

export class AccountDropdown extends React.Component<ICombo, any> {

  public onAccountSelect(option: any): void {
    let account: string = option.label; // {"account":{"value":"two","label":"outlook"}
    console.log('selected:' + account);
    this.props.dispatch(updateSettings(account, '', ''));
    this.props.dispatch(updateSettingsLists(this.props.accounts, [], []));
    this.populateProjects(account);
  }

  public render(): React.ReactElement<Provider> {
    console.log('account drop');

    return (
        <Select
            name='form-field-name'
            options={this.props.accounts}
            value={this.props.account}
            onChange={this.onAccountSelect.bind(this)}/>
    );
  }

  public populateProjects(account: string): void {
    Rest.getProjects(this.props.email, account, (projects: Project[]) => {
      let projectNames: ISettingsInfo[] = [];
      projects.forEach(project => {
        projectNames.push({ label: project.name, value: project.name });
      });
      this.props.dispatch(updateSettingsLists(this.props.accounts, projectNames, []));
  });
  }
}
