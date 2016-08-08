/// <reference path="../../typings/tsd.d.ts" />

/**
 * Represents the data for area path information, duplicated values for display in dropdown
 * @interface ISettingsInfo
 */
export interface ISettingsInfo {
  /**
   * the name of the option
   * @type {string}
   */
  label: string;
  /**
   * the name of the option
   * @type {string}
   */
  value: string;
}

/**
 * Represents the currently selected area path
 * @interface ISettingsAction
 */
export interface IAccountSettingsAction {
  /**
   * the name of the currently selected account
   * @type {string}
   */
  account: string;
  /**
   * list of accounts for user's profile
   * @type {ISettingsInfo[]}
   */
  accountList: ISettingsInfo[];
  /**
   * the type of the action
   * @type {string}
   */
  type: 'ACCOUNT_SETTINGS';
}

/**
 * action to update the area path and lists in the state
 * @param {string} accountNew
 * @param {ISettingsInfo[]} accounts
 * @returns {IAccountSettingsAction}
 */
export function updateAccountSettingsAction(accountNew: string, accounts: ISettingsInfo[]): IAccountSettingsAction {
  return {
        account: accountNew,
        accountList: accounts,
        type: 'ACCOUNT_SETTINGS',
  };
}

/**
 * Represents the currently selected area path
 * @interface ISettingsAction
 */
export interface IProjectSettingsAction {
  /**
   * the name of the currently selected project
   * @type {string}
   */
  project: string;
  /**
   * list of projects for currently selected account
   * @type {ISettingsInfo[]}
   */
  projectList: ISettingsInfo[];
  /**
   * the type of the action
   * @type {string}
   */
  type: 'PROJECT_SETTINGS';
}

/**
 * action to update the area path and lists in the state
 * @param {string} projectNew
 * @param {ISettingsInfo[]} projects
 * @returns {IProjectSettingsAction}
 */
export function updateProjectSettingsAction(projectNew: string, projects: ISettingsInfo[]): IProjectSettingsAction {
  return {
        project: projectNew,
        projectList: projects,
        type: 'PROJECT_SETTINGS',
  };
}

/**
 * Represents the currently selected area path
 * @interface ISettingsAction
 */
export interface ITeamSettingsAction {
  /**
   * the name of the currently selected team
   * @type {string}
   */
  team: string;
  /**
   * list of teams for currently selected project
   * @type {ISettingsInfo[]}
   */
  teamList: ISettingsInfo[];
  /**
   * the type of the action
   * @type {string}
   */
  type: 'TEAM_SETTINGS';
}

/**
 * action to update the area path and lists in the state
 * @param {string} teamNew
 * @param {ISettingsInfo[]} teams
 * @returns {ITeamSettingsAction}
 */
export function updateTeamSettingsAction(teamNew: string, teams: ISettingsInfo[]): ITeamSettingsAction {
  return {
        team: teamNew,
        teamList: teams,
        type: 'TEAM_SETTINGS',
  };
}

/**
 * Represents the user's information in the state
 * @interface IUserProfileAction
 */
export interface IUserProfileAction {
  /**
   * the type of the action
   * @type {string}
   */
  type: string;
  /**
   * the user's display name
   * @type {string}
   */
  displayName: string;
  /**
   * the user's email address
   * @type {string}
   */
  email: string;
  /**
   * the user's VSTS member id
   * @type {string}
   */
  memberID: string;
}

/**
 * action to update name, email, and member ID for user in the state
 * @param {string} name
 * @param {string} mail
 * @param {string} id
 * @returns {IUserProfileAction}
 */
export function updateUserProfileAction(name: string, mail: string, id: string): IUserProfileAction {
  return{
      displayName: name,
      email: mail,
      memberID: id,
      type: 'USER_PROFILE',
  };
}















