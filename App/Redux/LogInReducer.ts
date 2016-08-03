/// <reference path="../../typings/tsd.d.ts" />
import { ISettingsAction, IUserProfileAction, ISettingsInfo, ISettingsListsAction, ISettingsAndListsAction} from './LoginActions';

export interface ISettingsReducer {
  account: string;
  project: string;
  team: string;
}

const initialSettingsState: ISettingsReducer = {
    account: 'account',
    project: 'project',
    team: 'team',
};

export interface ISettingsListsReducer {
  accountList: ISettingsInfo[];
  projectList: ISettingsInfo[];
  teamList: ISettingsInfo[];
}

const initialLists: ISettingsListsReducer = {
  accountList: [],
  projectList: [],
  teamList: [],
};

export interface ISettingsAndListsReducer {
  lists: ISettingsListsReducer;
  settings: ISettingsReducer;
}

const initialTotalState: ISettingsAndListsReducer = {
    lists: initialLists,
    settings: initialSettingsState,
};

export function updateSettingsAndListsReducer(state: ISettingsAndListsReducer = initialTotalState,
                                           action: ISettingsAndListsAction): ISettingsAndListsReducer {
  switch (action.type) {
    case 'CURRENT_SETTINGS':
      return Object.assign({}, state, {
        lists: {accountList: action.accountList, projectList: action.projectList, teamList: action.teamList},
        settings: {account: action.account, project: action.project, team: action.team}});
    default:
      return state;
  }
}

export interface IUserProfileReducer {
  displayName: string;
  email: string;
  memberID: string;
}

const initialStateUser: IUserProfileReducer = {
      displayName: '',
      email: '',
      memberID: '',
};

export function updateUserProfileReducer(state: IUserProfileReducer = initialStateUser, action: IUserProfileAction): IUserProfileReducer {
  switch (action.type) {
    case 'USER_PROFILE':
      return Object.assign({}, state, {displayName: action.displayName, email: action.email, memberID: action.memberID});
    default:
      return state;
  }
}
