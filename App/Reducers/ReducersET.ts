import { Reducer, combineReducers } from 'redux';
import { ACTION, FOLLOW_STATE_TYPES,
  changeWIType, changeTitle, changeDescription, changeAddAsAttachment, changeFollowState, changeHTMLLink, 
  IWITypeAction, ITitleAction, IDescriptionAction, IAddAsAttachmentAction, IFollowStateAction, IHTMLLinkAction } from './ActionsET';
//import {reducer as formReducer} from 'redux-form';

export interface testState {
  wi_type: string;
  title: string;
  firstTime: boolean;
  description: string;
  addasattachment: boolean;
  followState: FOLLOW_STATE_TYPES;
  htmlLink: string;
}

export const initalState : testState = {
  wi_type: "bug",
  title : "",
  firstTime: true,
  description: "For more details, please refer to the attached email thread.",
  addasattachment: true,
  followState: FOLLOW_STATE_TYPES.Unfollowed,
  htmlLink: ""
};


function change_Fields(state: testState = initalState, action) : testState {
  switch (action.type) {
    case ACTION.WI_TYPE:
      return Object.assign( {}, state, {wi_type : action.wi_type});
    case ACTION.NEW_TITLE:
      return Object.assign( {}, state, {title : action.title, firstTime: action.firstTime});
    case ACTION.NEW_DESCRIPTION:
      return Object.assign( {}, state, {description : action.description});
    case ACTION.ADD_AS_ATTACHMENT:
      return Object.assign( {}, state, {addasattachment : action.addasattachment});
    default:
      return state;
 }
}


export const testreducer: Reducer = combineReducers({ testState : change_Fields});
