/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
//import {Users } from '../VSTS';
import {Auth} from '../../auth';
import {Error } from '../Error';
import {ISettingsState} from '../../Redux/LogInReducer';
import {updateSettings, ISettings} from '../../Redux/LoginActions';
import {AccountDropdown } from './AccountDropdown'
import {ProjectDropdown } from './ProjectDropdown'
import {AreaDropdown } from './AreaDropdown'
import { Rest, Account, Project, Team } from '../../RestHelpers/rest';

//other import statements don't work properly
require('react-select/dist/react-select.css');
let Select = require('react-select');

//TODO add lists
interface settingsLists {
  dispatch?: any;

}

function mapStateToProps(state: any): settingsLists{
  // state of type in any
  console.log('state:' + JSON.stringify(state));
  return ({

  });
}

@connect(mapStateToProps)

export class SettingsOptions extends React.Component<settingsLists, any> {

  public onAccountSelect(option): void {
    var account = option.label; //{"account":{"value":"two","label":"outlook"}
    console.log('updated');
    console.log('selected:' + account);
    this.props.dispatch(updateSettings(account, '', ''));
  }

  public render(): React.ReactElement<Provider> {
    console.log('got to settings');
    console.log('props:' + this.props);
    var accounts = [
      { label: 'O365exchange', value: 'O365exchange'},
      { label: 'Outlook' , value: 'Outlook'},
      { label: 'Mseng', value: 'Mseng'},
    ];

    //check if returning, Authorized, which page coming from
    return (
      <div>
      <label style = {this.style_label}> Account </label>
        <AccountDropdown />
        <label style = {this.style_label}> Project </label>
        <ProjectDropdown />
        <label style = {this.style_label}> Area </label>
        <AreaDropdown />
      </div>
    );
  }

   public populateAccounts(): void {
    //console.log("populateAccounts");
    Rest.getAccounts('t-mimccl@microsoft.com', (accounts: Account[]) => {
      let accountNames = [];
      accounts.forEach(account => {
        accountNames.push({value: account.name});
      },
      console.log("pure:"+accounts + "   names:"+accountNames)
    );

      this.setState({ accounts: accountNames });
    });
  }

  style_text = {
    color: 'rgb(63,63,63)', // dark gray
    font: '15px arial, ms-segoe-ui',
  };

  style_label = {
    color: 'rgb(107,107,107)', // dark gray
    font: '15px arial, ms-segoe-ui',
  };

}