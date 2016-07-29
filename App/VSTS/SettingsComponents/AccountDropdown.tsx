/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
//import {Users } from '../VSTS';
import {ISettingsState} from '../../Redux/LogInReducer';
import {updateSettings, ISettings} from '../../Redux/LoginActions';
import {Rest, Account } from '../../RestHelpers/rest';

//other import statements don't work properly
require('react-select/dist/react-select.css');
let Select = require('react-select');

interface settingsLocal {
  dispatch?: any;
  account?: string;
  project?: string;
  area?:string;
}

function mapStateToProps(state: any): settingsLocal {
  // state of type in any
  console.log('state:' + JSON.stringify(state));
  return ({
    account: state.ISettingsState.account,
    project: state.ISettingsState.project,
    area: state.ISettingsState.team,
  });
}

@connect(mapStateToProps)

export class AccountDropdown extends React.Component<settingsLocal, any> {

  public onAccountSelect(option): void {
    var account = option.label; //{"account":{"value":"two","label":"outlook"}
    console.log('updated');
    console.log('selected:' + account);
    this.props.dispatch(updateSettings(account, '', ''));
  }

  public render(): React.ReactElement<Provider> {

    console.log('got to settings');
    console.log('props:' + this.props.account);

    var accounts = [
      { label: 'o365exchange', value: 'o365exchange'},
      { label: 'outlook' , value: 'outlook'},
      { label: 'mseng', value: 'mseng'},
    ];

    //check if returning, Authorized, which page coming from
    return (
        <Select
            name='form-field-name'
            options={accounts}
            value={this.props.account}
            onChange={this.onAccountSelect.bind(this)}
            />
    );
  }
}