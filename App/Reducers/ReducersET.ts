import { Reducer, combineReducers } from 'redux';
import { ACTION, FollowTypes, Stage } from './ActionsET';
 /**
  * Represents the part of the state for the new WorkItem
  * @interface IWorkItem
  */
export interface IWorkItem {
    /**
     * Flag to signal the stage the user is on: New if no edits are make, Draft if edits were made, Saved if the user created the work item
     * @type {Stage}
     */
  stage: Stage;
    /**
     * the type of the work item
     * @type {string}
     */
  workItemType: string;
    /**
     * the title of the work item
     * @type {string}
     */
  title: string;
    /**
     * the description of the work item
     * @type {string}
     */
  description: string;
    /**
     * whether to attach the email to the newly created work item
     * @type {boolean}
     */
  addAsAttachment: boolean;
    /**
     * where the use is in the process of Following a work item
     * @type {FollowStateTypes}
     */
  followState: FollowTypes;
    /**
     * the htmlLink of the newly created VSTS work item
     * @type {string}
     */
  VSTShtmlLink: string;
    /**
     * the id of the newly created VSTS work item
     * @type {string}
     */
  id: string;
}
/**
 * The initial state of the workItem state 
 * @const
 */
export const initalState: IWorkItem = {
  VSTShtmlLink: '',
  addAsAttachment: true,
  description: 'For more details, please refer to the attached email thread. ',
  followState: FollowTypes.Unfollowed,
  id: '',
  stage: Stage.New,
  title : '',
  workItemType: 'Bug',
};

  /**
   * Handles changing the value of the fields with each action
   * @param {IWorkItem} state
   * @param {any} action
   */
function workItemReducer(state: IWorkItem = initalState, action: any): IWorkItem {
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
/**
 * The reducer for the workItem state
 * @const
 */
export const testreducer: Reducer = combineReducers({ workItem : workItemReducer});
