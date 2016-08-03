export enum ACTION {STAGE, GEAR, WORKITEMTYPE, NEWTITLE, NEWDESCRIPTION, ADDASATTACHMENT, FOLLOWSTATE, SAVE, POSTCREATION}
export enum FollowStateTypes {Followed, Unfollowed, Request}
export enum Stage {New, Draft, Saved}
export enum PageVisibility {Settings, CreateItem, InProcess, QuickActions} // remove upon merge
 /**
  * Represents the Stage Action
  * @interface IStageAction
  */
export interface IStageAction {
    /**
     * the type of the action
     * @type {ACTION}
     */
  type: ACTION;
    /**
     * Flag to signal the stage the user is on: New if no edits are make, Draft if edits were made, Saved if the user created the work item
     * @type {Stage}
     */
  stage: Stage;
}
 /**
  * Represents the Gear Action
  * @interface IGearAction
  */
export interface IGearAction {
    /**
     * the type of the action
     * @type {ACTION}
     */
  type: ACTION;
    /**
     * The page that is visible to the user/rendered
     * @type {PageVisibility}
     */
  pageVisibility: PageVisibility;
}
 /**
  * Represents the WorkItemType Action
  * @interface IWorkItemTypeAction
  */
export interface IWorkItemTypeAction {
    /**
     * the type of the action
     * @type {ACTION}
     */
  type: ACTION;
    /**
     * the workItemType selected
     * @type {string}
     */
  workItemType: string;
}
 /**
  * Represents the Title Action
  * @interface ITitleAction
  */
export interface ITitleAction {
    /**
     * the type of the action
     * @type {ACTION}
     */
  type: ACTION;
    /**
     * the title of the work item
     * @type {string}
     */
  title: string;
}
 /**
  * Represents the Description Action
  * @interface IDescriptionAction
  */
export interface IDescriptionAction {
    /**
     * the type of the action
     * @type {ACTION}
     */
  type: ACTION;
    /**
     * the description of the work item
     * @type {string}
     */
  description: string;
}
 /**
  * Represents the AddAsAttachment Action
  * @interface IAddAsAttachmentAction
  */
export interface IAddAsAttachmentAction {
    /**
     * the type of the action
     * @type {ACTION}
     */
  type: ACTION;
    /**
     * represents whether to attach the email to the work item or not
     * @type {boolean}
     */
  addAsAttachment: boolean;
}
 /**
  * Represents the Save Action
  * @interface ISaveAction
  */
export interface ISaveAction {
    /**
     * the type of the action
     * @type {ACTION}
     */
  type: ACTION;
    /**
     * The page that is visible to the user/rendered
     * @type {PageVisibility}
     */
  pageVisibility: PageVisibility;
    /**
     * The link to the newly created VSTS work item
     * @type {string}
     */
  VSTShtmlLink: string;
    /**
     * The id the newly created VSTS work item
     * @type {string}
     */
  id: string;
}
  /**
   * Handles update of the stage
   * @param {Stage} stage
   */
export function changeStage (stage: Stage): IStageAction {
  return {type: ACTION.STAGE, stage};
}
  /**
   * Handles update of the pageVisibility
   * @param {PageVisibility} pageVisibility
   */
export function changeGearVisiblility (pageVisibility: PageVisibility): IGearAction {
  return {type: ACTION.GEAR, pageVisibility};
}
  /**
   * Handles update of the workItemType
   * @param {string} workItemType
   */
export function changeWorkItemType (workItemType: string): IWorkItemTypeAction {
   return {type: ACTION.WORKITEMTYPE, workItemType};
 }
  /**
   * Handles update of the title
   * @param {string} title
   */
export function changeTitle (title: string): ITitleAction {
   return {type: ACTION.NEWTITLE, title};
 }
  /**
   * Handles update of the description
   * @param {string} description
   */
export function changeDescription (description: string): IDescriptionAction {
   return {type: ACTION.NEWDESCRIPTION, description};
 }
  /**
   * Handles update of addAsAttachment
   * @param {boolean} addAsAttachment
   */
export function changeAddAsAttachment (addAsAttachment: boolean): IAddAsAttachmentAction {
   return {addAsAttachment: !addAsAttachment, type: ACTION.ADDASATTACHMENT};
 }
  /**
   * Handles update of the pageVisibility, VSTShtmlLink, and id
   * @param {PageVisibility} pageVisibility
   * @param {string} VSTShtmlLink
   * @param {string} id
   */
export function changeSave (pageVisibility: PageVisibility, VSTShtmlLink: string, id: string): ISaveAction {
  return {type: ACTION.SAVE, pageVisibility, VSTShtmlLink, id};
}

