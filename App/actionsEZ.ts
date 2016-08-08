/// <reference path="../typings/tsd.d.ts" />
import { FollowTypes, IChangeFollowAction } from './statesEZ';

/**
 * The action changes the followState depending on the current state
 * @returns { IChangeFollowState }
 */
export function changeFollowAction(newState: FollowTypes): IChangeFollowAction {
  // return {
  //   followState: FollowTypes.Followed,
  //   type: 'ChangeFollowState',
  // };

  switch (newState) {
    case FollowTypes.Followed:
      return {
        followState: FollowTypes.Unfollowed,
        type: 'ChangeFollowState',
      };
    case FollowTypes.Unfollowed:
      return {
        followState: FollowTypes.Followed,
        type: 'ChangeFollowState',
      };
    default:
      return {
        followState: FollowTypes.Unfollowed,
        type: 'ChangeFollowState',
      };
  }
}
