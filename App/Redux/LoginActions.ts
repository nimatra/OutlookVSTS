/// <reference path="../../typings/tsd.d.ts" />
import { Auth, AuthState } from '../auth';
//action type

export interface ICurrentAccount{
  type: string
  account: string,
  project: string,
  areapath: string
}

export interface IAuthState{
  type: string,
  inProcess: boolean
  authState: AuthState
}

export function updateAccount( tempAccount:string, tempProject:string, tempArea:string): ICurrentAccount{
  return {
    type: 'UPDATE_ACCOUNT',
    account: tempAccount,
    project: tempProject,
    areapath: tempArea
  }
}

//action creator
export function updateAuth(newState:AuthState): IAuthState {
  return {
    type: 'UPDATE_AUTHSTATE',
    inProcess: false,
    authState: newState
  };
}

export function toggleInProcess(currentAuth:AuthState, connect:boolean): IAuthState{
  return {
    type: 'TOGGLE_PROCESS',
    inProcess: !connect,
    authState: currentAuth
  }
}














