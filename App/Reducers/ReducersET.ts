
import { Reducer, combineReducers } from 'redux';
import { ACTION, ITestingState, ITestingAction } from './ActionsET';

function changeme(state:ITestingState, action: ITestingAction) : ITestingState {
  switch (action.type) {
    case ACTION.ChangeTest:
      return state !=null ? {type: 'gotit', field: 'got it'} : {type: 'boooo', field: 'you'};
    default:
      return state != null ? state: {type: 'what happened', field: 'no idea'};
 }
}

 export const testreducer: Reducer = combineReducers({changeme});

