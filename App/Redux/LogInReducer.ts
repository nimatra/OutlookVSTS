/// <reference path="../../typings/tsd.d.ts" />

import { Reducer, combineReducers } from 'redux';
import { Auth} from '../auth';
import { Store, createStore } from 'redux';
import { ISettings, IUserProfile} from './LoginActions';

export interface ISettingsState{
  account: string;
  project: string;
  team: string;
}

const initialState: ISettingsState = {
    account: 'acc1',
    project: 'proj1',
    team: 'team1',
}

export function updateDefaultState(state:ISettingsState = initialState, action:ISettings): ISettingsState{
  switch (action.type){
    case 'DEFAULT_SETTINGS':
      return Object.assign({}, state, { account:action.account, project:action.project, team:action.team})
    default:
      return state;
  }
}

export interface IUserInfo{
  displayName: string,
  email: string,
  memberID: string
}

const initialStateUser: IUserInfo = {
      displayName: '',
      email: '',
      memberID: ''
}

export function updateUserInfo(state:IUserInfo = initialStateUser, action:IUserProfile){
  switch (action.type){
    case 'USER_PROFILE':
      return Object.assign({}, state, {displayName:action.displayName, email:action.email, memberID:action.memberID})
    default:
      return state;
  }
}

//export const overallRed: Reducer = combineReducers({ ISettingsState : updateDefaultState, IUserInfo: updateUserInfo});
