/// <reference path="../../typings/tsd.d.ts" />

import { Reducer, combineReducers } from 'redux';
import { updateUserProfileReducer, updateSettingsAndListsReducer } from './LoginReducer';
import { updateControlStateReducer} from './FlowReducer';

/**
 * combined reducer for entire application
 * @type {Reducer}
 */
export const completeAddInReducer: Reducer = combineReducers({ controlState : updateControlStateReducer,
    currentSettings : updateSettingsAndListsReducer,
    userProfile: updateUserProfileReducer});
