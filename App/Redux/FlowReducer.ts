/// <reference path="../../typings/tsd.d.ts" />
import {AuthState, PageVisibility} from './FlowActions';

export interface IAuthStateReducer {
  authState: AuthState;
  pageState: PageVisibility;
  error: IErrorStateReducer;
}

export interface IErrorStateReducer {
  isVisible: boolean;
  message: string;
}

const initialControlState: IAuthStateReducer = {
  authState : AuthState.None,
  error: {
    isVisible: false,
    message: ''},
  pageState : PageVisibility.Settings,
};

export function updateControlStateReducer(state: IAuthStateReducer = initialControlState, action: any): IAuthStateReducer {
  switch (action.type) {
    case 'ErrorState':
      return Object.assign({}, state, { isVisible: action.isVisible, message: action.message});
    case 'AUTH_STATE':
      return Object.assign({}, state, { authState: action.authState});
    case 'PAGE_STATE':
       return Object.assign({}, state, { pageState: action.pageState});
    default:
      return state;
  }
}















