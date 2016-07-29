/// <reference path="../../typings/tsd.d.ts" />
import { Auth} from '../auth';
import {AuthStateEnum, PageStateEnum, IErrorState, IPageState, IAuthState} from './FlowActions';

export interface IControlState{
  authState: AuthStateEnum;
  pageState: PageStateEnum;
  error: IErrorState;
}

const initialControlState: IControlState = {
  authState : AuthStateEnum.None,
  pageState : PageStateEnum.Settings,
  error: {
    type: 'ErrorState',
    isVisible: false,
    message: ''
  }
}

export function updateControlState(state = initialControlState, action ): IControlState{
  switch (action.type){
    case 'ErrorState':
      return Object.assign({}, state, { isVisible:action.isVisible, message: action.message});
    case 'AUTH_STATE':
      return Object.assign({}, state, { authState: action.authState});
    case 'PAGE_STATE':
       return Object.assign({}, state, { pageState: action.pageState});
    default:
      return state;
  }
}















