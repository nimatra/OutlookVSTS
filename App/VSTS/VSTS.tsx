/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { LogInPage } from './LoginComponents/LogInPage';
import { Settings} from './SettingsComponents/Settings';
import { Loading } from './SimpleComponents/Loading';
import { Connecting } from './SimpleComponents/Connecting';
import { Auth } from './authMM';
import { updateUserProfileAction} from '../Redux/LoginActions';
import { PageVisibility, AuthState, updateAuthAction, IErrorStateAction, updatePageAction } from '../Redux/FlowActions';
import { UserProfile } from '../RestHelpers/rest';
import { CreateWorkItem } from './CreateWorkItem';
import { QuickActions } from './QuickActions';

interface IRefreshCallback { (): void; }
interface IUserProfileCallback { (profile: UserProfile): void; }

/**
 * Properties needed for the main VSTS component
 * @interface IVSTSProps
 */
interface IVSTSProps {
  dispatch?: any;
  authState?: AuthState;
  pageState?: PageVisibility;
  error?: IErrorStateAction;
}

/**
 * maps state in application store to properties for the component
 * @param {any} state
 */
function mapStateToProps(state: any): IVSTSProps {
  console.log('state:' + JSON.stringify(state));
  return ({
      authState: state.controlState.authState,
      error: state.controlState.error,
      pageState: state.controlState.pageState,
  });
}

@connect(mapStateToProps)

export class VSTS extends React.Component<IVSTSProps, any> {

  public constructor() {
    super();
    this.Initialize = this.Initialize.bind(this);
    Office.initialize = this.Initialize;
  }

  /**
   * determines whether or not the component should re-render based on changes in state
   * @param {any} nextProps
   * @param {any} nextState
   */
  public shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    return (this.props.authState !== nextProps.authState) ||
      (this.props.pageState !== nextProps.pageState);
  }

  /**
   * Executed after Office.initialize is complete. 
   * Initial check for user authentication token and determines correct first page to show
   */
  public Initialize(): void {
    console.log('Initiating');
    // - TODO check for auth token
    let dispatch: any = this.props.dispatch;
    const email: string = Office.context.mailbox.userProfile.emailAddress;
    const name: string = Office.context.mailbox.userProfile.displayName;
    Auth.getAuthState(email, function (state: string): void {
      if (state === 'success') {
          dispatch(updateUserProfileAction(name, email, Office.context.roamingSettings.get('member_ID')));
          if (Office.context.roamingSettings.get('default_team') !== undefined) {
            dispatch(updatePageAction(PageVisibility.CreateItem)); // todo - may cause issues here
          }
          dispatch(updateAuthAction(AuthState.Authorized));
      }else {
          dispatch(updateAuthAction(AuthState.NotAuthorized));
      }
    });
  }

   /**
    * Renders the add-in. Contains logic to determine which component/page to display
    */
  public render(): React.ReactElement<Provider> {
    console.log('got to vsts');
    switch (this.props.authState) {
      case AuthState.None:
        return (<Loading />);
      case AuthState.NotAuthorized:
        return (<LogInPage />);
      case AuthState.Request:
        return (<Connecting/>);
      case AuthState.Authorized:
        {
            switch (this.props.pageState) {
              case PageVisibility.CreateItem:
                return (<CreateWorkItem />);
              case PageVisibility.QuickActions:
                return (<QuickActions />);
              case PageVisibility.Settings:
              default:
                return (<Settings />);
            }
        }
      default:
        return (<LogInPage />);
    }
  }
}

