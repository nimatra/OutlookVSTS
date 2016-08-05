/// <reference path="../typings/tsd.d.ts" />

/**
 * Enum for follow state types
 * @type { enum }
 */
export enum FollowTypes { Followed, Unfollowed };

/**
 * Defining the initial state values
 * @const
 */
export const InitialState: IWorkItem = {
  VSTShtmlLink: 'https://www.visualstudio.com/products/what-is-visual-studio-online-vs?WT.srch=1&WT.mc_ID=SEM_xXsQTNj1',
  followState: FollowTypes.Unfollowed,
  id: '<work item id>',
  title: '<work item title>',
  workItemType: '<work item type>',
};

export interface IWorkItem { // remove start
  VSTShtmlLink: string;
  followState: FollowTypes;
  id: string;
  title: string;
  workItemType: string;
} // remove end

/**
 * Interface for the changeFollowAction
 * @interface { IChangeFollowState }
 */
export interface IChangeFollowAction {
  /**
   * followState
   * @type { FollowTypes }
   */
  followState: FollowTypes;
  /**
   * type
   * @type { string }
   */
  type: string;
}
