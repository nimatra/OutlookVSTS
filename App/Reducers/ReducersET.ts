import { Reducer, combineReducers } from 'redux';
import { ACTION, changeTitle, ITestingAction } from './ActionsET';

export interface testState {
  value: string;
}

export const initalState : testState = {
  value : "initial state here"
};


function change_Title(state: testState = initalState, action : ITestingAction) : testState {
  switch (action.type) {
    case ACTION.NEW_TITLE:
      return Object.assign( {}, state, {value : action.value});
    default:
      return state;
 }
}

 export const testreducer: Reducer = combineReducers({change_Title});

