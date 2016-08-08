/// <reference path="../../typings/tsd.d.ts" />
import { IUserProfileAction, ISettingsInfo} from './LoginActions';

/**
 * Represents the currently selected area path and lists in the store
 * @interface ISettingsAndListsReducer
 */
export interface ISettingsAndListsReducer {
  /**
   * Represents the lists of options for current area path
   */
  lists: {
    accountList: ISettingsInfo[],
    projectList: ISettingsInfo[],
    teamList: ISettingsInfo[],
  };
  /**
   * Represents the current selected area path
   */
  settings: {
    account: string;
    project: string;
    team: string;
  };
}

/**
 * Represents the initial state for the area path and options lists
 * @type {ISettingsAndListsReducer}
 */
const initialSettingsState: ISettingsAndListsReducer = {
    lists: {
      accountList: [],
      projectList: [],
      teamList: [],
    },
    settings: {
      account: '',
      project: '',
      team: '',
    },
};

/**
 * reducer to update the area path and options lists in the store
 * @returns {ISettingsAndListsReducer}
 */
export function updateSettingsAndListsReducer(state: ISettingsAndListsReducer = initialSettingsState,
                                              action: any): ISettingsAndListsReducer {
  switch (action.type) {
    case 'ACCOUNT_SETTINGS':
      return Object.assign({}, state, {
        lists: {accountList: action.accountList, projectList: state.lists.projectList, teamList: state.lists.teamList},
        settings: {account: action.account, project: state.settings.project, team: state.settings.team}});
    case 'PROJECT_SETTINGS':
      return Object.assign({}, state, {
        lists: {accountList: state.lists.accountList, projectList: action.projectList, teamList: state.lists.teamList},
        settings: {account: state.settings.account, project: action.project, team: state.settings.team}});
    case 'TEAM_SETTINGS':
      return Object.assign({}, state, {
        lists: {accountList: state.lists.accountList, projectList: state.lists.projectList, teamList: action.teamList},
        settings: {account: state.settings.account, project: state.settings.project, team: action.team}});
    default:
      return state;
  }
}

/**
 * Represents the user's profile information in the store
 * @interface IUserProfileReducer
 */
export interface IUserProfileReducer {
  /**
   * Represents the current selected area path
   */
  displayName: string;
  email: string;
  memberID: string;
}

/**
 * Represents the initial state for the user's profile information
 * @type {IUserProfileReducer}
 */
const initialStateUser: IUserProfileReducer = {
      displayName: '',
      email: '',
      memberID: '',
};

/**
 * reducer to update the user profile information in the store
 * @returns {IUserProfileReducer}
 */
export function updateUserProfileReducer(state: IUserProfileReducer = initialStateUser, action: IUserProfileAction): IUserProfileReducer {
  switch (action.type) {
    case 'USER_PROFILE':
      return Object.assign({}, state, {displayName: action.displayName, email: action.email, memberID: action.memberID});
    default:
      return state;
  }
}
