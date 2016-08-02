import {AuthStateEnum} from './Redux/FlowActions';

export enum AuthState {
    None,       // no auth data is available
    Request,    // need to request auth data
    Authorized  // have authorization
}

export interface IAuthStateCallback { (state: AuthState): void; }

export interface IAuthStateCallbackNew { (state: AuthStateEnum): void; }

export class Auth {

    public static getAuthState(user: string, callback: IAuthStateCallback): void {
        console.log('old');
        $.get('./authenticate/db?user=' + user, (output) => {
            if (output === 'success') {
                callback(AuthState.Authorized);
            } else {
                callback(AuthState.Request);
            }
        });
    }

    public static getAuthStateNew(user: string, callback: IAuthStateCallbackNew): void {
        console.log('new:' + user);
        $.get('./authenticate/db?user=' + user, (output) => {
            console.log('output:' + output);
            if (output === 'success') {
                callback(AuthStateEnum.Authorized);
            } else { // output === failure
                console.log('failed');
                callback(AuthStateEnum.NotAuthorized);
            }
        });
    }
}
