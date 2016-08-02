/// <reference path="../typings/tsd.d.ts" />
import { FollowStateTypes } from './statesEZ';

export interface IChangeFollowState {
  followState: FollowStateTypes;
  type: string;
}

export function changeFollow(newState: FollowStateTypes): IChangeFollowState {
  return {
    followState: newState,
    type: 'ChangeFollowState',
  };
}
