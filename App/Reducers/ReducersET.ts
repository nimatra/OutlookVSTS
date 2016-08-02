import { Reducer, combineReducers } from 'redux';
import { ACTION, FollowStateTypes, Stage } from './ActionsET';

export interface IWorkItem {
  stage: Stage;
  workItemType: string;
  title: string;
  description: string;
  addAsAttachment: boolean;
  followState: FollowStateTypes;
  VSTShtmlLink: string;
  id: string;
}

export const initalState: IWorkItem = {
  VSTShtmlLink: '',
  addAsAttachment: true,
  description: 'For more details, please refer to the attached email thread.',
  followState: FollowStateTypes.Unfollowed,
  id: '',
  stage: Stage.New,
  title : '',
  workItemType: 'Bug',
};


function changeFields(state: IWorkItem = initalState, action: any): IWorkItem {
  switch (action.type) {
    case ACTION.STAGE:
      return Object.assign( {}, state, {stage : action.stage});
    case ACTION.WORKITEMTYPE:
      return Object.assign( {}, state, {workItemType : action.workItemType});
    case ACTION.NEWTITLE:
      return Object.assign( {}, state, {title : action.title});
    case ACTION.NEWDESCRIPTION:
      return Object.assign( {}, state, {description : action.description});
    case ACTION.ADDASATTACHMENT:
      return Object.assign( {}, state, {addAsAttachment : action.addAsAttachment});
    default:
      return state;
 }
}

export const testreducer: Reducer = combineReducers({ workItem : changeFields});
