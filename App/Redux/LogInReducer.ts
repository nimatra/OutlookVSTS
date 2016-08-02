/// <reference path="../../typings/tsd.d.ts" />
import { ISettings, IUserProfile, ISettingsInfo, ISettingsLists} from './LoginActions';

export interface ISettingsState{
  account: string;
  project: string;
  team: string;
}

const initialState: ISettingsState = {
    account: 'acc1',
    project: 'proj1',
    team: 'team1',
};

export function updateDefaultState(state: ISettingsState = initialState, action: ISettings): ISettingsState {
  switch (action.type) {
    case 'DEFAULT_SETTINGS':
      return Object.assign({}, state, { account: action.account, project: action.project, team: action.team});
    default:
      return state;
  }
}

export interface IAccountLists {
  accountList: ISettingsInfo[];
}

export interface ITeamLists {
  teamList: ISettingsInfo[];
}
export interface IProjectLists {
  projectList: ISettingsInfo[];
}

export interface ICurrentLists {
  accountList: ISettingsInfo[];
  projectList: ISettingsInfo[];
  teamList: ISettingsInfo[];
}

const initialLists: ICurrentLists = {
  accountList: [],
  projectList: [],
  teamList: [],
};

export function updateCurrentLists(state: ICurrentLists = initialLists, action: ISettingsLists): ICurrentLists {
  switch (action.type) {
    case 'DEFAULT_SETTINGS':
      return Object.assign({}, state, { accountList: action.accountList, projectList: action.projectList, teamList: action.teamList});
    default:
      return state;
  }
}

export interface IUserInfo {
  displayName: string;
  email: string;
  memberID: string;
}

const initialStateUser: IUserInfo = {
      displayName: '',
      email: '',
      memberID: '',
};

export function updateUserInfo(state: IUserInfo = initialStateUser, action: IUserProfile): IUserInfo {
  switch (action.type) {
    case 'USER_PROFILE':
      return Object.assign({}, state, {displayName: action.displayName, email: action.email, memberID: action.memberID});
    default:
      return state;
  }
}
