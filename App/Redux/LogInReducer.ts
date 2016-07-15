/// <reference path="../../typings/tsd.d.ts" />

import { Reducer, combineReducers } from 'redux';
import { Auth, AuthState } from '../auth';
import { IBoolAction, reverse} from './TestActions'
import { Store, createStore } from 'redux';

export interface IAuthState{
  authState: AuthState
}

const initialState:IAuthState = {
   authState: AuthState.None
}

/*function reverseRed(state:ITempState = initialState, action:IBoolAction): ITempState{
  switch (action.type){
    case 'REVERSE':
      return Object.assign({}, state, {value: action.value})
    default:
      return state;
  }
}

export const overallRed: Reducer = combineReducers({ ITempState : reverseRed });*/
