/// <reference path="../../typings/tsd.d.ts" />

import { Reducer, combineReducers } from 'redux';
import { Store, createStore } from 'redux';
import { ISettingsState, updateDefaultState, IUserInfo, updateUserInfo} from './LoginReducer';
import { IControlState, updateControlState} from './FlowReducer'

export const overallRed: Reducer = combineReducers({ ISettingsState : updateDefaultState, IUserInfo: updateUserInfo, IControlState:updateControlState});
