import * as React from 'react';

export enum AuthState {
    None,       // No auth data is available
    Request,    // Need to request auth data
    Authorized  // Have authorization
}

export interface AuthStateCallback { (state: AuthState, token: string) }

export class Auth {

    static getAuthState(user: string, callback: AuthStateCallback): void {
        $.get("./authenticate/db?user=" + user, (output) => {
            console.log(output);
            var json : any = JSON.parse(output);
            if (json.success == true) {
                callback(AuthState.Authorized, json.token);
            }
            else {
                callback(AuthState.Request, '');
            }
        })
    }
}