export enum ACTION {STAGE, GEAR, WORKITEMTYPE, NEWTITLE, NEWDESCRIPTION, ADDASATTACHMENT, FOLLOWSTATE, SAVE, POSTCREATION}
export enum FollowStateTypes {Followed, Unfollowed, Request}
export enum Stage {New, Draft, Saved}
export enum PageVisibility {Settings, CreateItem, InProcess, QuickActions} // remove upon merge

export interface IStageAction {
  type: ACTION;
  stage: Stage;
}

export interface IGearAction {
  type: ACTION;
  pageVisibility: PageVisibility;
}

export interface IWorkItemTypeAction {
  type: ACTION;
  workItemType: string;
}

export interface ITitleAction {
  type: ACTION;
  title: string;
}

export interface IDescriptionAction {
  type: ACTION;
  description: string;
}

export interface IAddAsAttachmentAction {
  type: ACTION;
  addAsAttachment: boolean;
}

export interface ISaveAction {
  type: ACTION;
  pageVisibility: PageVisibility;
  VSTShtmlLink: string;
}

export function changeStage (stage: Stage): IStageAction {
  return {type: ACTION.STAGE, stage};
}

export function changeGearVisiblility (pageVisibility: PageVisibility): IGearAction {
  return {type: ACTION.GEAR, pageVisibility};
}

export function changeWorkItemType (workItemType: string): IWorkItemTypeAction {
   return {type: ACTION.WORKITEMTYPE, workItemType};
 }

export function changeTitle (title: string): ITitleAction {
   return {type: ACTION.NEWTITLE, title};
 }

export function changeDescription (description: string): IDescriptionAction {
   return {type: ACTION.NEWDESCRIPTION, description};
 }

export function changeAddAsAttachment (addAsAttachment: boolean): IAddAsAttachmentAction {
   return {addAsAttachment: !addAsAttachment, type: ACTION.ADDASATTACHMENT};
 }

export function changeSave (pageVisibility: PageVisibility, VSTShtmlLink: string): ISaveAction {
  return {type: ACTION.SAVE, pageVisibility, VSTShtmlLink};
}

