/// <reference path="../../typings/tsd.d.ts" />
import { Auth} from '../auth';

export enum AuthStateEnum {
    None,       // no auth data is available
    NotAuthorized,    // need to request auth data
    Request,  // browser open
    Authorized  // have authorization
}

export enum PageStateEnum{
    Settings,
    CreateItem,
    QuickActions
}

export interface IAuthState {
    type: 'AUTH_STATE'
    authState: AuthStateEnum;
}

export interface IPageState {
    type: 'PAGE_STATE'
    pageState:PageStateEnum;
}

//action creator
export function updateAuth(newState:AuthStateEnum): IAuthState{
  return {
    type:'AUTH_STATE',
    authState: newState
    };
}

export function updatePage(newState:PageStateEnum): IPageState {
   return {
    type:'PAGE_STATE',
    pageState: newState
    };
}

export interface IErrorState{
  type: 'ErrorState';
  isVisible: boolean;
  message: string;
}

export function showError(visibility:boolean, msg:string): IErrorState{
  return{
    type: 'ErrorState',
    isVisible:visibility,
    message:msg
  }
}













