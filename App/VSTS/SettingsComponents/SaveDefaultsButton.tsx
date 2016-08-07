/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import {PageVisibility, updatePageAction} from '../../Redux/FlowActions';

interface ISettingsProps {
  /**
   * intermediate to dispatch actions to update the global store
   * @type {any}
   */
  dispatch?: any;
  /**
   * currently selected account option
   * @type {string}
   */
  account?: string;
  /**
   * currently selected project option
   * @type {string}
   */
  project?: string;
  /**
   * currently selected team option
   * @type {string}
   */
  team?: string;
}

/**
 * maps state in application store to properties for the component
 * @param {any} state
 */
function mapStateToProps(state: any): ISettingsProps {
  return({
      account: state.currentSettings.settings.account,
      project: state.currentSettings.settings.project,
      team: state.currentSettings.settings.team,
    });
}

@connect(mapStateToProps)

/**
 * Smart component
 * Renders area path dropdowns and save button
 * @class {Settings} 
 */
export class SaveDefaultsButton extends React.Component<ISettingsProps, any> {

  /**
   * saves current selected settings to Office Roaming Settings
   * updates page state to Create Work Item page
   * @returns {void}
   */
  public saveDefaults(): void {
    Office.context.roamingSettings.set('default_account', this.props.account);
    Office.context.roamingSettings.set('default_project', this.props.project);
    Office.context.roamingSettings.set('default_team', this.props.team);
    Office.context.roamingSettings.saveAsync();

    this.props.dispatch(updatePageAction(PageVisibility.CreateItem));
  }

  /**
   * Renders the area path dropdowns and save button
   */
  public render(): React.ReactElement<Provider> {
    let style_button: any = {
      align: 'right',
      background: 'rgb(255,255,255)',
      border: 'rgb(255,255,255)',
      color: 'rgb(0,122,204)',
      font: '15px arial, ms-segoe-ui',
      textalign: 'right',
    };

    return (
      <div>
          <button className = 'ms-Button' style = {style_button} onClick = {this.saveDefaults.bind(this)}>
            <span className= 'ms-Icon ms-Icon--save'> </span>
            <span font-family= 'Arial Black, Gadget, sans-serif'> Save and continue </span>
          </button>
      </div>
    );
  }
}
