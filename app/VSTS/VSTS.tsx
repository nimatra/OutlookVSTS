/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import {LogInPage } from './LoginComponents/LogInPage';
import {Settings} from './SettingsComponents/Settings';
import {Auth} from '../auth';
import {Loading } from './Loading';
import {Connecting } from './Connecting';
import {PageVisibilityEnum, AuthStateEnum, updateAuth, updatePage, showError, IErrorState} from '../Redux/FlowActions';
import {Rest, UserProfile, Account } from '../RestHelpers/rest';
import {updateSettings, updateUserProfile, updateSettingsLists,
  ISettingsInfo} from '../Redux/LoginActions';

interface IRefreshCallback { (): void; }
interface IUserProfileCallback { (profile: UserProfile): void; }

interface ISettingsLocal {
  dispatch?: any;
  account?: string;
  project?: string;
  team?: string;
}

interface IUserProf {
  dispatch?: any;
  email?: string;
  displayName?: string;
  memberId?: string;
}

interface IControlLocal {
  dispatch?: any;
  authState: AuthStateEnum;
  pageState: PageVisibilityEnum;
  error: IErrorState;
}

interface ICombo {
  dispatch?: any;
  settings?: ISettingsLocal;
  prof?: IUserProf;
  control?: IControlLocal;
}

function mapStateToProps(state: any): ICombo {
  // state of type in any
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

export class VSTS extends React.Component<ICombo, any> {

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

  authKey: any;
  pollInterval: number = 2000;
  timer: number = 0;
  timeMax: number = 10000;
  firstTime: boolean = true;

  // logic to check for tokens in db
  public refreshAuth(): void {
    console.log('refresh');
    console.log(this.timer);
    let localKey: any = this.authKey;

    let refresh: (state: AuthStateEnum) => void = this.updateAuthState;
    let currentState: AuthStateEnum = this.props.control.authState;
    console.log(this.props.prof.email);
    Auth.getAuthStateNew(this.props.prof.email, function (state: AuthStateEnum): void {
      if (state === AuthStateEnum.Authorized) {
        refresh(state);
        clearInterval(localKey);
      } else {
        if (currentState === AuthStateEnum.Request) {
          refresh(AuthStateEnum.Request);
        } else {
          refresh(state);
        }
      }
    });
  }

  // dispatch functions
  public updateAuthState(state: AuthStateEnum): void {
    console.log(this.props)
    this.props.dispatch(updateAuth(state));
  }

  public setupOutlook(): void {
    // get email and display name and save to store
    console.log(Office.context.mailbox.userProfile.emailAddress)
    const email: string = Office.context.mailbox.userProfile.emailAddress;
    const name: string = Office.context.mailbox.userProfile.displayName;
    let id: string = Office.context.roamingSettings.get('member_ID');
    if (id === undefined) {
      this.props.dispatch(updateUserProfile(name, email, ''));
    } else {
      this.props.dispatch(updateUserProfile(name, email, id));
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
    const dispatch: (property) => void = this.props.dispatch;
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
        dispatch(updateSettings('account', 'project', 'team'));
        dispatch(updateUserProfile(name, email, id));

        this.populateAccounts();
      });
    } else { // set all defaults and change pageState to CreateItem
      console.log('else');
      const account: string = Office.context.roamingSettings.get('default_account');
      const project: string = Office.context.roamingSettings.get('default_project');
      const team: string = Office.context.roamingSettings.get('default_team');

      this.firstTime = false;
      this.props.dispatch(updateUserProfile(this.props.prof.displayName, this.props.prof.email, temp));
      this.props.dispatch(updateSettings(account, project, team));
      this.props.dispatch(updatePage(PageVisibilityEnum.CreateItem));
      this.populateAccounts();
    }
  }

  public render(): React.ReactElement<Provider> {
    console.log('got to vsts');
    console.log(this.props.control.authState);
    switch (this.props.control.authState) {
      case AuthStateEnum.None:
        return (<Loading />); // waiting for Office to initialize
      case AuthStateEnum.NotAuthorized:
        return (<LogInPage />);
      case AuthStateEnum.Request:
        return (<Connecting/>)
      case AuthStateEnum.Authorized:
        {
          if (this.firstTime) {
            this.checkFirstTime();
            return (<Loading />);
          } else {
            switch (this.props.control.pageState) {
              case PageVisibilityEnum.Settings:
                return (<Settings />);
              case PageVisibilityEnum.CreateItem:
                return (<div>Create Item...</div>);
              case PageVisibilityEnum.QuickActions:
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

  public populateAccounts(): void {
    console.log('populating');

    let accountNames: ISettingsInfo[] = [];
    let emptyList: ISettingsInfo[] = [];
    Rest.getAccountsNew(this.props.prof.email, this.props.prof.memberId, (accounts: Account[]) => {
      console.log('accounts!:' + accounts);
      accounts.forEach(account => {
        accountNames.push({ label: account.name, value: account.name });
      });
      this.props.dispatch(updateSettingsLists(accountNames, emptyList, emptyList));
    });
  }
}

