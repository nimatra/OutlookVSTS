/// <reference path="../../typings/tsd.d.ts" />

export enum AuthState {
    None,       // no auth data is available
    NotAuthorized,    // need to request auth data
    Request,  // browser open
    Authorized  // have authorization
}

export enum PageVisibility {
    Settings,
    CreateItem,
    QuickActions
}

export interface IAuthStateAction {
    type: 'AUTH_STATE';
    authState: AuthState;
}

export interface IPageStateAction {
    type: 'PAGE_STATE';
    pageState: PageVisibility;
}

export function updateAuthAction(newState: AuthState): IAuthStateAction {
  return {
    authState: newState,
    type: 'AUTH_STATE',
    };
}

export function updatePageAction(newState: PageVisibility): IPageStateAction {
   return {
    pageState: newState,
    type: 'PAGE_STATE',
    };
}

export interface IErrorStateAction {
  type: 'ErrorState';
  isVisible: boolean;
  message: string;
}

export function updateErrorAction(visibility: boolean, msg: string): IErrorStateAction {
  return{
    isVisible: visibility,
    message: msg,
    type: 'ErrorState',
  };
}













