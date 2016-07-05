export enum AuthState {
    None,       // no auth data is available
    Request,    // need to request auth data
    Authorized  // have authorization
}

export interface IAuthStateCallback { (state: AuthState): void; }

export class Auth {

    public static getAuthState(user: string, callback: IAuthStateCallback): void {
        $.get('./authenticate/db?user=' + user, (output) => {
            if (output === 'success') {
                callback(AuthState.Authorized);
            } else {
                callback(AuthState.Request);
            }
        });
    }
}
