/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import {updateTeamSettingsAction, ISettingsInfo} from '../../Redux/LoginActions';
import {Rest, Team } from '../../RestHelpers/rest';
require('react-select/dist/react-select.css');
let Select: any = require('react-select');

/**
 * Properties needed for the AreaDropdown component
 * @interface IAreaProps
 */
interface IAreaProps {
  /**
   * intermediate to dispatch actions to update the global store
   * @type {any}
   */
  dispatch?: any;
  /**
   * user's VSTS memberID
   * @type {string}
   */
  id?: string;
  /**
   * user's email address
   * @type {string}
   */
  email?: string;
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
  /**
   * Represents the lists of teams for current project
   * @type {ISettingsInfo[]}
   */
  teams?: ISettingsInfo[];
}

/**
 * maps state in application store to properties for the component
 * @param {any} state
 */
function mapStateToProps(state: any): IAreaProps {
  return ({
    account: state.currentSettings.settings.account,
    email: state.userProfile.email,
    id: state.userProfile.memberID,
    project: state.currentSettings.settings.project,
    team: state.currentSettings.settings.team,
    teams: state.currentSettings.lists.teamList,
  });
}

@connect(mapStateToProps)

/**
 * Smart component
 * Renders area dropdown
 * @class {AreaDropdown} 
 */
export class AreaDropdown extends React.Component<IAreaProps, any> {

  public constructor() {
    super();
    this.populateTeams = this.populateTeams.bind(this);
  }

  /** 
   * executed first time component renders, reads the default project
   * @return {void}
   */
  public componentWillMount(): void {
    let defaultTeam: string = Office.context.roamingSettings.get('default_team');
    if (defaultTeam !== undefined) {
      this.props.dispatch(updateTeamSettingsAction(defaultTeam, this.props.teams));
    }
  }

  /**
   * determines whether or not the component should re-render based on changes in state
   * @param {any} nextProps
   * @param {any} nextState
   */
  public shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    return this.props.project !== nextProps.project || JSON.stringify(this.props.teams)!==JSON.stringify(nextProps.teams);
  }

  /**
   * Reaction to selection of team option from dropdown list
   * @param {any} option
   * @returns {void}
   */
  public onTeamSelect(option: any): void {
    let team: string = option.label;
    this.props.dispatch(updateTeamSettingsAction(team, this.props.teams));
  }

  /**
   * Renders the react-select dropdown component
   */
  public render(): React.ReactElement<Provider> {
    this.populateTeams(this.props.account, this.props.project);
    return (
        <Select
            name='form-field-name'
            options={this.props.teams}
            value={this.props.team}
            onChange={this.onTeamSelect.bind(this)}
            />
    );
  }

    /**
     * Populates list of teams for given project from VSTS rest call
     * Updates the store for current sesttings and current options lists
     * @param {string} account, {string} project
     * @returns {void}
     */
    public populateTeams(account: string, project: string): void {
      let teamOptions: ISettingsInfo[] = [];
      let teamNamesOnly: string[] = [];
      let selectedTeam: string = this.props.team;

      Rest.getTeams(this.props.email, project, account, (teams: Team[]) => {
        teams.forEach(team => {
          teamOptions.push({label: team.name, value: team.name});
          teamNamesOnly.push(team.name);
        });
        if (selectedTeam === '' || (teamNamesOnly.indexOf(selectedTeam) === -1)) {
            selectedTeam = teamNamesOnly[0];
        }
        this.props.dispatch(updateTeamSettingsAction(selectedTeam, teamOptions));
      });
  }
}
