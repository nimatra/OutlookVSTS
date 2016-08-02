/// <reference path="../../typings/tsd.d.ts" />
import {AuthStateEnum, PageVisibilityEnum, IErrorState} from './FlowActions';

export interface IControlState{
  authState: AuthStateEnum;
  pageState: PageVisibilityEnum;
  error: IErrorState;
}

const initialControlState: IControlState = {
  authState : AuthStateEnum.None,
  error: {
    isVisible: false,
    message: '',
    type: 'ErrorState' },
  pageState : PageVisibilityEnum.Settings,
};

export function updateControlState(state: IControlState = initialControlState, action: any): IControlState {
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















