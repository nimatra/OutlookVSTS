/// <reference path="../../typings/tsd.d.ts" />

/**
 * enum for Authentication State Process
 * @type {enum}
 */
export enum AuthState {
    /**
     * no auth data is available and Office has not initialized
     */
    None,
    /**
     * user not authenticated
     */
    NotAuthorized,
    /**
     * browser open while user authenticated
     */
    Request,
    /**
     * user fully authenticated with VSTS
     */
    Authorized
}

/**
 * enum for page visibility and web flow
 * @type {enum}
 */
export enum PageVisibility {
    /**
     * show the settings page
     */
    Settings,
    /**
     * show the create work item page
     */
    CreateItem,
    /**
     * show the quick actions page
     */
    QuickActions
}

/**
 * Represents the current level of authentication in the state
 * @interface IAuthStateAction
 */
export interface IAuthStateAction {
    /**
     * the type of the action
     * @type {string}
     */
    type: 'AUTH_STATE';
    /**
     * the authentication state 
     * @type {AuthState}
     */
    authState: AuthState;
}

/**
 * Represents the current page in the state
 * @interface IPageStateAction
 */
export interface IPageStateAction {
    /**
     * the type of the action
     * @type {string}
     */
    type: 'PAGE_STATE';
    /**
     * the page state 
     * @type {AuthState}
     */
    pageState: PageVisibility;
}

/**
 * action to update the authentication state
 * @param {AuthState} newState
 * @returns {IAuthStateAction}
 */
export function updateAuthAction(newState: AuthState): IAuthStateAction {
    return {
        authState: newState,
        type: 'AUTH_STATE',
    };
}

/**
 * action to update the page state
 * @param {AuthState} newState
 * @returns {IPageStateAction}
 */
export function updatePageAction(newState: PageVisibility): IPageStateAction {
    return {
        pageState: newState,
        type: 'PAGE_STATE',
    };
}

/**
 * Represents the error data in the state
 * @interface IErrorStateAction
 */
export interface IErrorStateAction {
    /**
     * the type of the action
     * @type {string}
     */
    type: 'ErrorState';
    /**
     * is error visible
     * @type {boolean}
     */
    isVisible: boolean;
    /**
     * error message
     * @type {string}
     */
    message: string;
}

/**
 * action to update the message and visibility of an error
 * @param {boolean} visibility
 * @param {string} msg
 * @returns {IErrorStateAction}
 */
export function updateErrorAction(visibility: boolean, msg: string): IErrorStateAction {
    return {
        isVisible: visibility,
        message: msg,
        type: 'ErrorState',
    };
}













