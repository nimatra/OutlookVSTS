/// <reference path="../../typings/tsd.d.ts" />

export enum AuthStateEnum {
    None,       // no auth data is available
    NotAuthorized,    // need to request auth data
    Request,  // browser open
    Authorized  // have authorization
}

export enum PageVisibilityEnum {
    Settings,
    CreateItem,
    QuickActions
}

export interface IAuthState {
    type: 'AUTH_STATE';
    authState: AuthStateEnum;
}

export interface IPageState {
    type: 'PAGE_STATE';
    pageState: PageVisibilityEnum;
}

export function updateAuth(newState: AuthStateEnum): IAuthState {
  return {
    authState: newState,
    type: 'AUTH_STATE',
    };
}

export function updatePage(newState: PageVisibilityEnum): IPageState {
   return {
    pageState: newState,
    type: 'PAGE_STATE',
    };
}

export interface IErrorState {
  type: 'ErrorState';
  isVisible: boolean;
  message: string;
}

export function showError(visibility: boolean, msg: string): IErrorState {
  return{
    isVisible: visibility,
    message: msg,
    type: 'ErrorState',
  };
}













