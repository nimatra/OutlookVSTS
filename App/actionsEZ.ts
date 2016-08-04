/// <reference path="../typings/tsd.d.ts" />
import { FollowStateTypes, IChangeFollowState } from './statesEZ';

/**
 * The action changes the followState depending on the current state
 * @returns { IChangeFollowState }
 */
export function changeFollowAction(newState: FollowStateTypes): IChangeFollowState {
  return {
    followState: newState,
    type: 'ChangeFollowState',
  };
}
