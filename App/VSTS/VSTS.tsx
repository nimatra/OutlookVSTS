/// <reference path="../../office.d.ts" />
import * as React from 'react';
import {Provider, connect } from 'react-redux';
import {LogInPage } from './LoginComponents/LogInPage';
import {Settings} from './SettingsComponents/Settings';
import {Auth} from './authMM';
import {Loading } from './Loading';
import {Connecting } from './Connecting';
import {PageVisibility, AuthState, updateAuthAction, updatePageAction, IErrorStateAction, updateErrorAction} from '../Redux/FlowActions';
import {Rest, UserProfile, Account } from '../RestHelpers/rest';
import {updateUserProfileAction, updateSettingsAndListsAction, /*updateSettings, updateSettingsLists,*/
  ISettingsInfo} from '../Redux/LoginActions';

interface IRefreshCallback { (): void; }
interface IUserProfileCallback { (profile: UserProfile): void; }

interface ISettingsLocalProps {
  dispatch?: any;
  account?: string;
  project?: string;
  team?: string;
}

interface IUserProfileProps {
  dispatch?: any;
  email?: string;
  displayName?: string;
  memberId?: string;
}

interface IControlLocalProps {
  dispatch?: any;
  authState: AuthState;
  pageState: PageVisibility;
  error: IErrorStateAction;
}

interface IVSTSProps {
  dispatch?: any;
  settings?: ISettingsLocalProps;
  prof?: IUserProfileProps;
  control?: IControlLocalProps;
}

function mapStateToProps(state: any): IVSTSProps {
  console.log('state:' + JSON.stringify(state));

  return ({
    control: {
      authState: state.IControlState.authState,
      error: state.IControlState.error,
      pageState: state.IControlState.pageState,
    },
    prof: {
      displayName: state.IUserInfo.displayName,
      email: state.IUserInfo.email,
      memberId: state.IUserInfo.memberID,
    },
    settings: {
      account: state.ISettingsState.account,
      project: state.ISettingsState.project,
      team: state.ISettingsState.team,
    },
  });
}

@connect(mapStateToProps)

export class VSTS extends React.Component<IVSTSProps, any> {

  private authKey: any;
  private pollInterval: number = 3000;
  private firstTime: boolean = true;

  public constructor() {
    super();
    this.Initialize = this.Initialize.bind(this);
    this.setupOutlook = this.setupOutlook.bind(this);
    this.checkFirstTime = this.checkFirstTime.bind(this);
    this.refreshAuth = this.refreshAuth.bind(this);
    this.updateAuthState = this.updateAuthState.bind(this);
    this.populateAccounts = this.populateAccounts.bind(this);
    Office.initialize = this.Initialize;
  }

  // logic to check for tokens in db
  public refreshAuth(): void {
    console.log('refresh');
    let localKey: any = this.authKey;

    let refresh: (state: AuthState) => void = this.updateAuthState;
    let currentState: AuthState = this.props.control.authState;
    console.log(this.props.prof.email);
    Auth.getAuthState(this.props.prof.email, function (state: AuthState): void {
      console.log(state);
      if (state === AuthState.Authorized) {
        refresh(state);
        clearInterval(localKey);
      } else {
        if (currentState === AuthState.Request) {
          refresh(AuthState.Request);
        } else {
          refresh(state);
        }
      }
    });
  }

  // dispatch functions
  public updateAuthState(state: AuthState): void {
    console.log(this.props);
    this.props.dispatch(updateAuthAction(state));
  }

  public setupOutlook(): void {
    // get email and display name and save to store
    console.log(Office.context.mailbox.userProfile.emailAddress);
    const email: string = Office.context.mailbox.userProfile.emailAddress;
    const name: string = Office.context.mailbox.userProfile.displayName;
    let id: string = Office.context.roamingSettings.get('member_ID');
    if (id === undefined) {
      this.props.dispatch(updateUserProfileAction(name, email, ''));
    } else {
      this.props.dispatch(updateUserProfileAction(name, email, id));
    }
  }

  public Initialize(): void {
    console.log('Initiating');
    this.setupOutlook();
    this.authKey = setInterval(this.refreshAuth, this.pollInterval);
  }

  public checkFirstTime(): void {
    console.log('pulling from roaming settings');
    const temp: string = ''; // use for testing createWorkItem Office.context.roamingSettings.get('member_ID'); //default_team
    const dispatch: (property: any) => void = this.props.dispatch;
    const name: string = this.props.prof.displayName;
    const email: string = this.props.prof.email;
    console.log('pulled:' + temp);
    this.firstTime = false;
    if (temp === undefined || temp === '') { // first time

      let id: string = '';
      console.log('first');
      // get profile and memberID rest calls
      Rest.getUserProfile(this.props.prof.email, (profile: UserProfile) => {
        console.log('id:' + profile.id);
        id = profile.id;
        Office.context.roamingSettings.set('member_ID', '' + id);
        Office.context.roamingSettings.saveAsync();
        dispatch(updateUserProfileAction(name, email, id));
        this.populateAccounts('acc1', 'proj1', 'team1');
      });
    } else { // set all defaults and change pageState to CreateItem
      console.log('else');
      const account: string = Office.context.roamingSettings.get('default_account');
      const project: string = Office.context.roamingSettings.get('default_project');
      const team: string = Office.context.roamingSettings.get('default_team');

      this.firstTime = false;
      this.props.dispatch(updateUserProfileAction(this.props.prof.displayName, this.props.prof.email, temp));
      this.props.dispatch(updatePageAction(PageVisibility.CreateItem));
      this.populateAccounts(account, project, team);
    }
  }

  public render(): React.ReactElement<Provider> {
    console.log('got to vsts');
    console.log(this.props.control.authState);
    switch (this.props.control.authState) {
      case AuthState.None:
        return (<Loading />);
      case AuthState.NotAuthorized:
        return (<LogInPage />);
      case AuthState.Request:
        return (<Connecting/>);
      case AuthState.Authorized:
        {
          if (this.firstTime) {
            this.checkFirstTime();
            return (<Loading />);
          } else {
            switch (this.props.control.pageState) {
              case PageVisibility.Settings:
                return (<Settings />);
              case PageVisibility.CreateItem:
                return (<div>Create Item...</div>);
              case PageVisibility.QuickActions:
                return (<div>Quick Actions...</div>);
              default:
                return (<div>FAILURE</div>);
            }
          }
        }
      default:
        {
          console.log('default');
          return (<div>FAILURE</div>);
        }
    }
  }

  public populateAccounts(acc, project, team): void {
    console.log('populating');

    let accountNames: ISettingsInfo[] = [];
    let emptyList: ISettingsInfo[] = [];
    Rest.getAccountsNew(this.props.prof.email, this.props.prof.memberId, (accounts: Account[]) => {
      console.log('accounts!:' + accounts);
      accounts.forEach(account => {
        accountNames.push({ label: account.name, value: account.name });
      });
      this.props.dispatch(updateSettingsAndListsAction(acc, project, team, accountNames, [], []));
    });
  }
}

