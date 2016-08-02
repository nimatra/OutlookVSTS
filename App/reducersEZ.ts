/// <reference path="../typings/tsd.d.ts" />

import { Reducer, combineReducers } from 'redux';
import { IChangeFollowState } from './actionsEZ';
import { InitialState, IWorkItem } from './statesEZ';

function changeFollowReducer(state: IWorkItem = InitialState, action: IChangeFollowState): IWorkItem {
  switch (action.type) {
    case 'ChangeFollowState':
      return Object.assign({}, state, {followState: action.followState});
    default:
      return state;
  }
}

export const quickActionReducer: Reducer = combineReducers({ quickActionState: changeFollowReducer });
