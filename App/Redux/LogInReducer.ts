/// <reference path="../../typings/tsd.d.ts" />

import { Reducer, combineReducers } from 'redux';
import { Auth, AuthState } from '../auth';
import { ACTION } from './LoginActions'
import { Auth, AuthState } from '../auth';

export interface IUser{
    authState: AuthState;
    authToken : string;
    user: string;
    returning: boolean;
    prevPage: ''
}

//intitial state
const initialState = {
     authState: AuthState.None,
     authToken: '',
     user: '',
     returning: false
}

//(state,action) => nextstate
export function loginred(state = initialState, action){
  switch(action.type){
      case UPDATE_AUTH_STATE:
        return state;
      case SET_RETURNING:
        return state;
      default:
        return state;
  }
}

/*function getFields(type: string): IField[]{
  return [{label: 'Story Points', value: '', type: 'integer'},
          {label: 'Priority', value: '', type: 'integer'},
          {label: 'Description', value: '', type: 'html'}];
}

function updateWorkItemType(state: IWorkItemState, action: IWorkItemAction): IWorkItemState {
  switch (action.type) {
    case ACTION.ChangeWorkItemType:
       return state != null ? { type: action.workItemType, fields: getFields(action.workItemType) }
         : { type: 'Bug', fields: getFields('Bug') };
    default:
      return state != null ? state : { type: 'Bug', fields: getFields('Bug') };
  }
}

export const vsoAddin: Reducer = combineReducers({ updateWorkItemType });*/
