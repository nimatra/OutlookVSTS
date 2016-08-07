/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { updateAccountSettingsAction , ISettingsInfo} from '../../Redux/LoginActions';
import {Rest, Account} from '../../RestHelpers/rest';
require('react-select/dist/react-select.css');
let Select: any = require('react-select');

/**
 * Properties needed for the AccountDropdown component
 * @interface IAccountProps
 */
interface IAccountProps {
  /**
   * intermediate to dispatch actions to update the global store
   * @type {any}
   */
  dispatch?: any;
  /**
   * user's email address
   * @type {string}
   */
  email?: string;
  /**
   * user's VSTS member id
   * @type {string}
   */
  memberId?: string;
  /**
   * currently selected account option
   * @type {string}
   */
  account?: string;
  /**
   * list of accounts associated with user's VSTS profile
   * @type {ISettingsInfo[]}
   */
  accounts?: ISettingsInfo[];
}

/**
 * maps state in application store to properties for the component
 * @param {any} state
 */
function mapStateToProps(state: any): IAccountProps {
  return ({
    account: state.currentSettings.settings.account,
    accounts: state.currentSettings.lists.accountList,
    email: state.userProfile.email,
    memberId: state.userProfile.memberID,
  });
}

@connect(mapStateToProps)

/**
 * Smart component
 * Renders account dropdowns
 * @class {AccountDropdown} 
 */
export class AccountDropdown extends React.Component<IAccountProps, any> {

  public constructor() {
    super();
    this.populateAccounts = this.populateAccounts.bind(this);
  }

  /**
   * Populates accounts for user's profile before first time account drop down is rendered
   * @returns {void}
   */
  public componentWillMount(): void {
    let defaultAccount: string = Office.context.roamingSettings.get('default_account');
    if (defaultAccount !== undefined) {
      this.props.dispatch(updateAccountSettingsAction(defaultAccount, this.props.accounts));
    }
    this.populateAccounts();
  }

  /**
   * Reaction to selection of account option from dropdown list
   * Triggers repopulation of projects for selected account
   * @param {any} option
   * @returns {void}
   */
  public onAccountSelect(option: any): void {
    let account: string = option.label;
    this.props.dispatch(updateAccountSettingsAction(account, this.props.accounts));
  }

  /**
   * Renders the react-select dropdown component
   */
  public render(): React.ReactElement<Provider> {
    return (
        <Select
            name='form-field-name'
            options={this.props.accounts}
            value={this.props.account}
            onChange={this.onAccountSelect.bind(this)}/>
    );
  }

   /**
    * Populates list of accounts for given profile from VSTS rest call
    * Updates the store for current settings and current options lists
    * @returns {void}
    */
  public populateAccounts(): void {
    let accountOptions: ISettingsInfo[] = [];
    let accountNamesOnly: string[] = [];
    let selectedAccount: string = this.props.account;

    Rest.getAccountsNew(this.props.email, this.props.memberId, (accounts: Account[]) => {
      accounts.forEach(acc => {
        accountOptions.push({ label: acc.name, value: acc.name });
        accountNamesOnly.push(acc.name);
      });
      if (selectedAccount === '' || (accountNamesOnly.indexOf(selectedAccount) === -1)) { // very first time user
        selectedAccount = accountNamesOnly[0];
      }
      this.props.dispatch(updateAccountSettingsAction(selectedAccount, accountOptions));
    });
  }
}
