/// <reference path="../typings/tsd.d.ts" />

import { Reducer, combineReducers } from 'redux';
import { IEditText } from './actionsEZ';

const InitialState: sampleState = {
  value: 'initialstate',
  foo: true
}

export interface sampleState {
  value: string;
  foo: boolean;
}

function sampleReducer(state: sampleState = InitialState, action: IEditText): sampleState {
  console.log('got to sampleReducer'+state.value);
  switch(action.type) {
    case "WriteText":
      console.log('got to WriteText Switch'+state.value);

      return Object.assign({}, state, {value: action.value});
    default:
      console.log('got to Default Switch'+state.value);
    return state;
  }
}

export const combinedReducer: Reducer = combineReducers({ sampleState: sampleReducer });