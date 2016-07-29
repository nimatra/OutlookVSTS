/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import {LogInPage } from './LoginComponents/LogInPage';
import {Settings} from './SettingsComponents/Settings';
import {Auth} from '../auth';
import {Test } from './TestComponents/Test';
import {Error } from './Error';
import {Loading } from './Loading';
import {Connecting } from './Connecting';
import {ISettingsState} from '../Redux/LogInReducer';
import {updateSettings, updateUserProfile} from '../Redux/LoginActions';
import {PageStateEnum, AuthStateEnum, updateAuth, updatePage, showError, IErrorState} from '../Redux/FlowActions';
import {IControlState} from '../Redux/FlowReducer';
import {Rest, UserProfile } from '../RestHelpers/rest';


//export enum Users { None, EmilyT, EmilyZ, Miranda}
interface IRefreshCallback { (): void; }
interface IUserProfileCallback { (profile: UserProfile): void; }

interface settingsLocal {
  dispatch?: any;
  account?: string;
  project?: string;
  team?: string;
}

interface userProf{
  dispatch?:any;
  email?:string;
  displayName?:string;
  memberId?:string;
}

interface controlLocal{
  dispatch?:any;
  authState: AuthStateEnum,
  pageState: PageStateEnum,
  error: IErrorState,
}

interface combo{
  dispatch?: any;
  settings?: settingsLocal;
  prof?: userProf;
  control?: controlLocal;
}

function mapStateToProps(state: any): combo {
  // state of type in any
  console.log('state:' + JSON.stringify(state));

  return ({
    settings: {
      account: state.ISettingsState.account,
      project: state.ISettingsState.project,
      team: state.ISettingsState.team,
    },
    prof: {
      displayName:state.IUserInfo.displayName,
      email:state.IUserInfo.email,
      memberId:state.IUserInfo.memberID,
    },
    control: {
      authState: state.IControlState.authState,
      pageState: state.IControlState.pageState,
      error: state.IControlState.error,
    }
  });
}

@connect(mapStateToProps)

export class VSTS extends React.Component<combo, any> {

  public constructor(){
    super();
    //this.state = {user:Users.None,};
    this.Initialize = this.Initialize.bind(this);
    this.setupOutlook = this.setupOutlook.bind(this);
    this.checkFirstTime = this.checkFirstTime.bind(this);
    this.refreshAuth = this.refreshAuth.bind(this);
    this.updateAuthState = this.updateAuthState.bind(this);
    Office.initialize = this.Initialize;
  }

  authKey: any;
  pollInterval: number = 2000;
  timer: number = 0;
  timeMax: number = 10000;
  firstTime: boolean = true;

  //logic to check for tokens in db
  private refreshAuth(): void {
    console.log('refresh');
    console.log(this.timer);
    let localKey : any = this.authKey;
    /*this.timer = this.timer + this.pollInterval;
    if(this.timer >= this.timeMax) //stops looped checking
      clearInterval(localKey);*/

    let refresh = this.updateAuthState;
    let currentState = this.props.control.authState;
    console.log(this.props.prof.email)
    Auth.getAuthStateNew(this.props.prof.email, function (state: AuthStateEnum): void {
      if (state === AuthStateEnum.Authorized) {
        refresh(state);
        clearInterval(localKey);
    }
      else{
        if(currentState === AuthStateEnum.Request)
        {  refresh(AuthStateEnum.Request)}
        else
        {refresh(state);}
      }
});
  }

  //dispatch functions
  public updateAuthState(state: AuthStateEnum) : void{
    console.log(this.props)
    this.props.dispatch(updateAuth(state));
  }

private setupOutlook():void{
    //get email and display name and save to store
    console.log(Office.context.mailbox.userProfile.emailAddress)
    const email = Office.context.mailbox.userProfile.emailAddress;
    const name = Office.context.mailbox.userProfile.displayName;
    let id = Office.context.roamingSettings.get('member_ID');
    if(id === undefined)
    {  this.props.dispatch(updateUserProfile(name,email,''));}
    else
    {  this.props.dispatch(updateUserProfile(name,email,id));}
}

  private Initialize():void{
    console.log("Initiating");
    this.setupOutlook();
    this.authKey = setInterval(this.refreshAuth, this.pollInterval);
}

  private checkFirstTime():void{
    console.log("pulling from roaming settings");
    const temp = Office.context.roamingSettings.get('member_ID');
    const dispatch = this.props.dispatch;
    const name = this.props.prof.displayName;
    const email= this.props.prof.email;
    console.log("pulled:" + temp);
    if(temp==undefined || temp == '') //first time
    {
      let id = '';
        //get profile and memberID rest calls
        Rest.getUserProfile(this.props.prof.email, (profile: UserProfile) => {
            console.log("id:"+profile.id);
            id = profile.id;
            Office.context.roamingSettings.set('member_ID',''+id);
            Office.context.roamingSettings.saveAsync();
            dispatch(updateUserProfile(name,email,id)).then(()=> dispatch(updatePage(PageStateEnum.Settings)));
            });
        this.firstTime = false;
    }
    else
      { //set all defaults and change pageState to CreateItem
        const account = Office.context.roamingSettings.get('default_account');
        const project = Office.context.roamingSettings.get('default_project');
        const team = Office.context.roamingSettings.get('default_team');

        //chain these
        this.firstTime = false;
        this.props.dispatch(updateUserProfile(this.props.prof.displayName,this.props.prof.email,temp)).then(() => this.props.dispatch(updateSettings(account, project, team)).then(() => this.props.dispatch(updatePage(PageStateEnum.CreateItem))));
      }
     this.firstTime = false;
     console.log("end")
  }

  public render(): React.ReactElement<Provider> {
    console.log('got to vsts');
    console.log(this.props.control.authState)
    switch(this.props.control.authState) {
      case AuthStateEnum.None:// We have to wait for Office to initialize, so show a waiting state
        return (<Loading />);
      case AuthStateEnum.NotAuthorized:
      {
        return (<LogInPage />);
      }
      case AuthStateEnum.Request:
        return (<Connecting/>)
      case AuthStateEnum.Authorized:
      {
        if(this.firstTime)
        { this.checkFirstTime();}
        switch(this.props.control.pageState) {
          case PageStateEnum.Settings:
            return (<Settings />);
          case PageStateEnum.CreateItem:
            return (<div>Create Item...</div>);
          case PageStateEnum.QuickActions:
            return (<div>Quick Actions...</div>);
          default:
            return (<div>FAILURE</div>);
        }
      }
      default:
      {  console.log('default');
         return (<div>FAILURE</div>);
      }
    }
  }}


