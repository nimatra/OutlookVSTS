/// <reference path="../typings/tsd.d.ts" />

import { Reducer, combineReducers } from 'redux';
import { IWorkItemAction, ACTION } from './actions';
import { IWorkItemState, IField }  from './workItemModel';

function getFields(type: string): IField[]{
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

export const vsoAddin: Reducer = combineReducers({ updateWorkItemType });
