/// <reference path="../../typings/tsd.d.ts" />

import { Reducer, combineReducers } from 'redux';
import { IUser } from './LoginModel'
import { Auth, AuthState } from '../auth';
import { UPDATE_AUTH_STATE, SET_RETURNING, SET_PREV_PAGE} from './LoginActions'
//import { IWorkItemAction, ACTION } from '../actions';
//import { IWorkItemState, IField }  from '../workItemModel';

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
