import { Reducer, combineReducers } from 'redux';
import { ACTION, changeTitle, ITestingAction } from './ActionsET';

export interface testState {
  temp: string;

}

export const initalState : testState = {
  temp : "initial title here"
};


function change_Title(state: testState = initalState, action : ITestingAction) : testState {
  switch (action.type) {
    case ACTION.NEW_TITLE:
      return Object.assign( {}, state, {value : action.title});
    default:
      return state;
 }
}

 export const testreducer: Reducer = combineReducers({ testState : change_Title });

