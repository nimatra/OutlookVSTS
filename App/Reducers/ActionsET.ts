//export const NEW_TITLE = 'NEW_TITLE'

export enum ACTION {WI_TYPE, NEW_TITLE, NEW_DESCRIPTION, ADD_AS_ATTACHMENT, FOLLOW_STATE, HTML_LINK}
export enum FOLLOW_STATE_TYPES {Followed, Request, Unfollowed}

export interface IWITypeAction {
  type: ACTION;
  wi_type: string;
}

export interface ITitleAction {
  type: ACTION;
  title: string;
  firstTime : boolean;
}

export interface IDescriptionAction {
  type: ACTION;
  description: string;
}

export interface IAddAsAttachmentAction {
  type: ACTION;
  addasattachment: boolean;
}

export interface IFollowStateAction {
  type: ACTION;
  followState: FOLLOW_STATE_TYPES;
}

export interface IHTMLLinkAction {
  type: ACTION;
  htmlLink: string;
}

 export function changeWIType (wi_type: string): IWITypeAction {
   return {type: ACTION.WI_TYPE, wi_type};
 }

 export function changeTitle (title: string, firstTime: boolean): ITitleAction {
   return {type: ACTION.NEW_TITLE, title, firstTime: false};
 }

 export function changeDescription (description : string): IDescriptionAction {
   return {type: ACTION.NEW_DESCRIPTION, description};
 }
 
 export function changeAddAsAttachment (addasattachment :boolean): IAddAsAttachmentAction {
   return {type: ACTION.ADD_AS_ATTACHMENT, addasattachment: !addasattachment};
 }

 export function changeFollowState (followState: FOLLOW_STATE_TYPES ): IFollowStateAction {
   return {type: ACTION.FOLLOW_STATE, followState};
 }

 export function changeHTMLLink (htmlLink: string) : IHTMLLinkAction {
   return {type: ACTION.HTML_LINK, htmlLink}
 }