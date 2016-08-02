/// <reference path="../typings/tsd.d.ts" />

export enum FollowStateTypes { Followed, Request, Unfollowed };

export const InitialState: IWorkItem = {
  VSTShtmlLink: 'https://www.visualstudio.com/products/what-is-visual-studio-online-vs?WT.srch=1&WT.mc_ID=SEM_xXsQTNj1',
  followState: FollowStateTypes.Unfollowed,
  id: '<work item id>',
  title: '<work item title>',
  workItemType: '<work item type>',
};

export interface IWorkItem { // remove start
  VSTShtmlLink: string;
  followState: FollowStateTypes;
  id: string;
  title: string;
  workItemType: string;
} // remove end
