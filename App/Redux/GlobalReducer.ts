/// <reference path="../../typings/tsd.d.ts" />

import { Reducer, combineReducers } from 'redux';
import { updateDefaultState,  updateUserInfo,  updateCurrentLists} from './LoginReducer';
import { updateControlState} from './FlowReducer';

export const overallRed: Reducer = combineReducers({ IControlState:updateControlState,
    ICurrentLists: updateCurrentLists, ISettingsState : updateDefaultState,
    IUserInfo: updateUserInfo });
