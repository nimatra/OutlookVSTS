/// <reference path="../../typings/tsd.d.ts" />

import { Reducer, combineReducers } from 'redux';
import { updateUserProfileReducer, updateSettingsAndListsReducer } from './LoginReducer';
import { updateControlStateReducer} from './FlowReducer';

export const overallRed: Reducer = combineReducers({ IAuthStateReducer : updateControlStateReducer,
    ISettingsAndListsReducer : updateSettingsAndListsReducer,
    IUserProfileReducer: updateUserProfileReducer});
