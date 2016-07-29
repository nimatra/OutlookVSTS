/// <reference path="../../../typings/tsd.d.ts" />


//action types

//action type
export interface IBoolAction{
  type: string,
  value: boolean
}

export interface IProfileAction{
  type:string,
  value: any
}
//action creator
export function reverse(val:boolean): IBoolAction {
  return {
    type: 'REVERSE',
    value: !val
  };
}

export function updateProfile(val:any): IProfileAction{
  return {
    type: 'UPDATE_PROFILE',
    value: val
  }
}
