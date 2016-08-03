import {AuthState} from './Redux/FlowActions';

export interface IAuthStateCallback { (state: AuthState): void; }

export class Auth {

    public static getAuthState(user: string, callback: IAuthStateCallback): void {
        console.log('new:' + user);
        $.get('./authenticate/db?user=' + user, (output) => {
            console.log('output:' + output);
            if (output === 'success') {
                callback(AuthState.Authorized);
            } else { // output === failure
                console.log('failed');
                callback(AuthState.NotAuthorized);
            }
        });
    }
}
